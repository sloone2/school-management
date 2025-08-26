import { Injectable } from '@angular/core';
import { ApiService, ExecutionOptions } from './../shared/service/api/api.service';
import { TokenService, User } from './../shared/service/api/token.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'student' | 'parent';
  studentId?: string;
  dateOfBirth?: string;
  grade?: string;
  canLoginDirectly?: boolean;
  phone?: string;
  relationship?: 'father' | 'mother' | 'guardian' | 'other';
}

export interface AuthResponse {
  access_token: string;
  user: any;
}

export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  refreshToken?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private api: ApiService,
    private tokenService: TokenService
  ) {}

  /**
   * Login user with enhanced error handling and progress tracking
   */
  login(credentials: LoginRequest, options: ExecutionOptions<LoginResponse> = {}): Observable<LoginResponse> {
    return this.api.executeHttp<LoginResponse>(() =>
        this.api.post<LoginResponse>('/auth/login', credentials),
      {
        progressMessage: 'Signing in...',
        successMessage: 'Welcome back!',
        showProgress: true,
        showSuccessAlert: true,
        showErrorAlert: false, // Let components handle login errors for better UX
        logErrors: true,
        ...options
      }
    ).pipe(
      tap(response => {
        // Store authentication data using TokenService
        this.tokenService.setAuthData(response.token, response.user);
      })
    );
  }

  /**
   * Register new user
   * Note: Using direct API call to maintain your existing logic
   * The ApiService will still handle errors and logging automatically
   */
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/api/auth/register', data, {
      progressMessage: 'Creating your account...',
      showProgress: true,
      showSuccessAlert: false, // Let component handle success message
      showErrorAlert: false, // Let component handle error messages for better UX
      logErrors: true
    }).pipe(
      tap(res => {
        // Store authentication data using TokenService
        this.tokenService.setToken(res.access_token);
        this.tokenService.setUser(res.user);
      })
    );
  }

  /**
   * Logout user with optional confirmation
   */
  logout(showConfirmation: boolean = false): Observable<void> | void {
    if (showConfirmation) {
      // Use ApiService confirmation dialog
      return this.api.executeHttp(() =>
          this.api.post<void>('/auth/logout', {}),
        {
          progressMessage: 'Signing out...',
          successMessage: 'You have been logged out successfully',
          showProgress: true
        }
      ).pipe(
        tap(() => {
          this.clearAuthData();
        })
      );
    } else {
      // Simple logout without server call
      this.clearAuthData();
    }
  }

  /**
   * Logout with confirmation dialog
   */
  logoutWithConfirmation(): Observable<void | { cancelled: boolean }> {
    return this.api.httpWithConfirmation(
      () => this.api.post<void>('/auth/logout', {}),
      'logout',
      {
        title: 'Logout Confirmation',
        text: 'Are you sure you want to logout?',
        confirmButton: 'Yes, Logout'
      },
      {
        progressMessage: 'Signing out...',
        successMessage: 'You have been logged out successfully'
      }
    ).pipe(
      tap(result => {
        // Only clear auth data if not cancelled
        if (result && typeof result === 'object' && !('cancelled' in result)) {
          this.clearAuthData();
        }
      })
    );
  }

  /**
   * Get user profile from server
   */
  getProfile(): Observable<any> {
    return this.api.get('/auth/profile', undefined, {
      progressMessage: 'Loading profile...',
      showProgress: false, // Don't show progress for profile requests
      showSuccessAlert: false,
      showErrorAlert: true,
      logErrors: true
    });
  }

  /**
   * Update user profile
   */
  updateProfile(profileData: any): Observable<any> {
    return this.api.put('/auth/profile', profileData, {
      progressMessage: 'Updating profile...',
      successMessage: 'Profile updated successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true
    }).pipe(
      tap(updatedUser => {
        // Update stored user data
        this.tokenService.setUser(updatedUser);
      })
    );
  }

  /**
   * Change password
   */
  changePassword(passwordData: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.api.put('/auth/change-password', passwordData, {
      progressMessage: 'Changing password...',
      successMessage: 'Password changed successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true
    });
  }

  /**
   * Request password reset
   */
  requestPasswordReset(email: string): Observable<any> {
    return this.api.post('/auth/forgot-password', { email }, {
      progressMessage: 'Sending reset email...',
      successMessage: 'Password reset email sent! Please check your inbox.',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true
    });
  }

  /**
   * Reset password with token
   */
  resetPassword(resetData: { token: string; password: string }): Observable<any> {
    return this.api.post('/auth/reset-password', resetData, {
      progressMessage: 'Resetting password...',
      successMessage: 'Password reset successfully! You can now login with your new password.',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true
    });
  }

  /**
   * Refresh authentication token
   */
  refreshToken(): Observable<LoginResponse> {
    return this.api.post<LoginResponse>('/auth/refresh', {}, {
      showProgress: false,
      showSuccessAlert: false,
      showErrorAlert: false, // Handle refresh errors silently
      logErrors: true
    }).pipe(
      tap(response => {
        // Update stored token and user data
        this.tokenService.setAuthData(response.token, response.user);
      })
    );
  }

  /**
   * Verify email address
   */
  verifyEmail(token: string): Observable<any> {
    return this.api.post('/auth/verify-email', { token }, {
      progressMessage: 'Verifying email...',
      successMessage: 'Email verified successfully!',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true
    });
  }

  /**
   * Resend email verification
   */
  resendEmailVerification(): Observable<any> {
    return this.api.post('/auth/resend-verification', {}, {
      progressMessage: 'Sending verification email...',
      successMessage: 'Verification email sent! Please check your inbox.',
      showProgress: true,
      showSuccessAlert: true,
      showErrorAlert: true,
      logErrors: true
    });
  }

  // ===== AUTHENTICATION STATE METHODS =====

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }

  /**
   * Get current user data
   */
  getCurrentUser(): User | null {
    return this.tokenService.getUser();
  }

  /**
   * Get current JWT token
   */
  getToken(): string | null {
    return this.tokenService.getToken();
  }

  /**
   * Check if token will expire soon
   */
  willTokenExpireSoon(withinMinutes: number = 5): boolean {
    return this.tokenService.willExpireSoon(withinMinutes);
  }

  /**
   * Get time until token expires (in minutes)
   */
  getTimeUntilExpiration(): number | null {
    return this.tokenService.getTimeUntilExpiration();
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    return this.tokenService.hasRole(role);
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: string[]): boolean {
    return this.tokenService.hasAnyRole(roles);
  }

  /**
   * Get user role
   */
  getUserRole(): string | null {
    return this.tokenService.getUserRole();
  }

  // ===== OBSERVABLE STREAMS =====

  /**
   * Observable for authentication state changes
   */
  get authState$() {
    return this.tokenService.authState$;
  }

  /**
   * Observable for user data changes
   */
  get user$() {
    return this.tokenService.user$;
  }

  // ===== PRIVATE HELPER METHODS =====

  /**
   * Clear all authentication data
   */
  private clearAuthData(): void {
    this.tokenService.clear();
    // Redirect to login page
    window.location.href = '/auth/login';
  }

  /**
   * Handle authentication errors (can be extended)
   */
  private handleAuthError(error: any): void {
    console.error('Authentication error:', error);

    // If token is invalid or expired, clear auth data
    if (error.status === 401) {
      this.clearAuthData();
    }
  }
}

// ===== ADDITIONAL INTERFACES =====

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface EmailVerificationRequest {
  token: string;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  grade?: string;
  relationship?: string;
  [key: string]: any;
}
