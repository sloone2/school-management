import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataService } from 'src/app/shared/service/data/data.service';
import { LoginRequest, AuthService } from '../auth.service';
import { routes } from 'src/app/shared/service/routes/routes';
import { welcomeLogin } from 'src/app/models/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  public routes = routes;
  public welcomeLogin: welcomeLogin[] = [];
  public loginForm!: FormGroup;
  public isLoading = false;
  public errorMessage = '';
  public password: boolean = false;

  public authSlider = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    rtl: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  constructor(
    private DataService: DataService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    this.welcomeLogin = this.DataService.welcomeLogin;
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  togglePassword(): void {
    this.password = !this.password;
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.clearErrorMessage();

    const credentials: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // Use AuthService login with proper Observable handling
    this.authService.login(credentials, {
      progressMessage: 'Signing in...',
      successMessage: 'Welcome back!',
      showProgress: true,
      showSuccessAlert: false, // Handle success manually for better UX
      showErrorAlert: false,   // Handle errors manually for better UX
      logErrors: true
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        // ApiService already handled token storage via tap operator
        this.redirectUser(response.user);
      },
      error: (error) => {
        this.isLoading = false;
        this.handleLoginError(error);
      }
    });
  }

  private handleLoginError(error: any): void {
    // Clear any previous error messages
    this.errorMessage = '';

    // Handle different types of errors with user-friendly messages
    if (error.status === 401) {
      this.errorMessage = 'Invalid email or password. Please try again.';
    } else if (error.status === 403) {
      this.errorMessage = 'Your account has been suspended. Please contact support.';
    } else if (error.status === 429) {
      this.errorMessage = 'Too many login attempts. Please try again later.';
    } else if (error.status === 0) {
      this.errorMessage = 'Network error. Please check your internet connection.';
    } else if (error.status >= 500) {
      this.errorMessage = 'Server error. Please try again later.';
    } else {
      // Extract message from error response
      const errorMessage = error.error?.message || error.message || 'Login failed. Please try again.';
      this.errorMessage = errorMessage;
    }

    // Log error for debugging (ApiService already handles this)
    console.error('Login error:', error);
  }

  private redirectUser(user: any): void {
    // Clear any error messages on successful login
    this.clearErrorMessage();

    // Redirect based on user type and role
    switch (user.userType) {
      case 'staff':
        if (user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate([routes.instructor_dashboard]);
        }
        break;
      case 'student':
        this.router.navigate(['/student/dashboard']);
        break;
      case 'parent':
        this.router.navigate(['/parent/dashboard']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  private clearErrorMessage(): void {
    this.errorMessage = '';
  }

  // ===== HELPER METHODS FOR TEMPLATE =====

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  // ===== ADDITIONAL HELPER METHODS =====

  /**
   * Clear error message when user starts typing
   */
  onFieldFocus(): void {
    if (this.errorMessage) {
      this.clearErrorMessage();
    }
  }

  /**
   * Check if form is ready to submit
   */
  get canSubmit(): boolean {
    return this.loginForm.valid && !this.isLoading;
  }

  /**
   * Get submit button text based on loading state
   */
  get submitButtonText(): string {
    return this.isLoading ? 'Signing in...' : 'Login';
  }

  /**
   * Check if there are any form errors
   */
  get hasFormErrors(): boolean {
    return this.loginForm.invalid && this.loginForm.touched;
  }

  /**
   * Get form validation status for styling
   */
  get formValidationClass(): string {
    if (this.loginForm.untouched) return '';
    return this.loginForm.valid ? 'is-valid' : 'is-invalid';
  }
}
