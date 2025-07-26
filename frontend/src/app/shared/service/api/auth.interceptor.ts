// core/interceptors/auth.interceptor.ts - Enhanced Auth Interceptor
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { TokenService } from './token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add token to request if available
    const authReq = this.addTokenToRequest(req);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          return this.handle401Error(authReq, next);
        }

        // Handle 403 Forbidden errors
        if (error.status === 403) {
          return this.handle403Error();
        }

        return throwError(() => error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenService.getToken();

    if (token && this.shouldAddToken(request)) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return request;
  }

  private shouldAddToken(request: HttpRequest<any>): boolean {
    // Don't add token to login/register endpoints
    const excludedUrls = [
      '/auth/login',
      '/auth/register',
      '/auth/refresh',
      '/auth/forgot-password'
    ];

    return !excludedUrls.some(url => request.url.includes(url));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // Try to refresh token (if you have refresh token logic)
      // For now, we'll just clear the token and redirect to login
      return this.handleTokenExpired();
    } else {
      // If already refreshing, wait for the new token
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => next.handle(this.addTokenToRequest(request)))
      );
    }
  }

  private handle403Error(): Observable<never> {
    // User doesn't have permission
    console.warn('Access denied - insufficient permissions');

    // You might want to redirect to an "access denied" page
    // this.router.navigate(['/access-denied']);

    return throwError(() => new Error('Access denied'));
  }

  private handleTokenExpired(): Observable<never> {
    console.warn('Token expired or invalid');

    // Clear token and user data
    this.tokenService.clear();

    // Reset refresh state
    this.isRefreshing = false;
    this.refreshTokenSubject.next(null);

    // Redirect to login page
    this.router.navigate(['/login']);

    return throwError(() => new Error('Token expired'));
  }

  // If you have refresh token functionality, implement this method
  private refreshToken(): Observable<any> {
    // Example refresh token implementation:
    /*
    const refreshToken = this.tokenService.getRefreshToken();

    if (!refreshToken) {
      return this.handleTokenExpired();
    }

    return this.http.post('/auth/refresh', { refreshToken }).pipe(
      tap((response: any) => {
        this.tokenService.setToken(response.accessToken);
        this.refreshTokenSubject.next(response.accessToken);
      }),
      catchError(() => {
        return this.handleTokenExpired();
      }),
      finalize(() => {
        this.isRefreshing = false;
      })
    );
    */

    // For now, just handle as expired
    return this.handleTokenExpired();
  }
}
