// core/services/token.service.ts - Enhanced Token Service
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly tokenKey = 'access_token';
  private readonly userKey = 'user';

  // Observable for authentication state
  private authStateSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public authState$ = this.authStateSubject.asObservable();

  // Observable for user data
  private userSubject = new BehaviorSubject<User | null>(this.getUser());
  public user$ = this.userSubject.asObservable();

  constructor() {
    // Check token validity on service initialization
    this.validateToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authStateSubject.next(true);
  }

  getUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  clear(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.authStateSubject.next(false);
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      const isValid = Date.now() / 1000 < exp;

      if (!isValid) {
        // Token expired, clear it
        this.clear();
      }

      return isValid;
    } catch {
      // Invalid token format, clear it
      this.clear();
      return false;
    }
  }

  // Get token expiration time
  getTokenExpiration(): Date | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      return new Date(exp * 1000);
    } catch {
      return null;
    }
  }

  // Get time until token expires (in minutes)
  getTimeUntilExpiration(): number | null {
    const expiration = this.getTokenExpiration();
    if (!expiration) return null;

    const now = new Date();
    const diff = expiration.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60)); // Convert to minutes
  }

  // Check if token will expire soon (within specified minutes)
  willExpireSoon(withinMinutes: number = 5): boolean {
    const timeLeft = this.getTimeUntilExpiration();
    return timeLeft !== null && timeLeft <= withinMinutes;
  }

  // Validate current token and update auth state
  private validateToken(): void {
    const isValid = this.isAuthenticated();
    this.authStateSubject.next(isValid);

    if (!isValid) {
      this.userSubject.next(null);
    }
  }

  // Set both token and user data (typically after login)
  setAuthData(token: string, user: User): void {
    this.setToken(token);
    this.setUser(user);
  }

  // Get user role
  getUserRole(): string | null {
    const user = this.getUser();
    return user?.role || null;
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  // Check if user has any of the specified roles
  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;
  }
}
