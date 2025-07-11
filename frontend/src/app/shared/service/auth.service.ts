import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { environment } from '../environments/environment';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'student' | 'parent' | 'staff';
  role: string;
  claims: string[];
  frontendRoutes: string[];
  children?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    studentId: string;
    grade: string;
  }>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'student' | 'parent';
  // Student fields
  studentId?: string;
  grade?: string;
  dateOfBirth?: string;
  // Parent fields
  phone?: string;
  relationship?: string;
  emergencyContact?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiClient: AxiosInstance;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.apiClient = axios.create({
      baseURL: environment.apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.apiClient.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );

    // Check if user is already logged in
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = this.getToken();
    const user = this.getStoredUser();
    
    if (token && user) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await this.apiClient.post('/auth/login', credentials);
      const authData = response.data;
      
      this.setAuthData(authData);
      return authData;
    } catch (error) {
      console.error('Login error:', error);
      throw this.handleError(error);
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await this.apiClient.post('/auth/register', userData);
      const authData = response.data;
      
      this.setAuthData(authData);
      return authData;
    } catch (error) {
      console.error('Registration error:', error);
      throw this.handleError(error);
    }
  }

  async getNavigation(): Promise<any> {
    try {
      const response = await this.apiClient.get('/auth/navigation');
      return response.data;
    } catch (error) {
      console.error('Navigation error:', error);
      throw this.handleError(error);
    }
  }

  async getUserProfile(): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.apiClient.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Profile error:', error);
      throw this.handleError(error);
    }
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private setAuthData(authData: AuthResponse): void {
    localStorage.setItem('access_token', authData.access_token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    this.currentUserSubject.next(authData.user);
    this.isAuthenticatedSubject.next(true);
  }

  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  hasClaim(claim: string): boolean {
    const user = this.getCurrentUser();
    return user?.claims?.includes(claim) || false;
  }

  hasAnyOfClaims(claims: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user?.claims) return false;
    return claims.some(claim => user.claims.includes(claim));
  }

  hasRoute(route: string): boolean {
    const user = this.getCurrentUser();
    return user?.frontendRoutes?.includes(route) || false;
  }

  isUserType(userType: string): boolean {
    const user = this.getCurrentUser();
    return user?.userType === userType;
  }

  isParent(): boolean {
    return this.isUserType('parent');
  }

  isStudent(): boolean {
    return this.isUserType('student');
  }

  isStaff(): boolean {
    return this.isUserType('staff');
  }

  getChildren(): Array<any> {
    const user = this.getCurrentUser();
    return user?.children || [];
  }

  private handleError(error: any): Error {
    let message = 'An unexpected error occurred';
    
    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }
    
    return new Error(message);
  }
}

