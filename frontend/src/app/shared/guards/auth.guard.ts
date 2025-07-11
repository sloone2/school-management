import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          // Check if user has required claims
          const requiredClaims = route.data?.['requiredClaims'] as string[];
          if (requiredClaims && requiredClaims.length > 0) {
            const hasRequiredClaims = this.authService.hasAnyOfClaims(requiredClaims);
            if (!hasRequiredClaims) {
              this.router.navigate(['/unauthorized']);
              return false;
            }
          }

          // Check if user has required route access
          const requiredRoute = route.data?.['requiredRoute'] as string;
          if (requiredRoute && !this.authService.hasRoute(requiredRoute)) {
            this.router.navigate(['/unauthorized']);
            return false;
          }

          return true;
        } else {
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClaimsGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredClaims = route.data?.['requiredClaims'] as string[];
    
    if (!requiredClaims || requiredClaims.length === 0) {
      return true;
    }

    if (this.authService.hasAnyOfClaims(requiredClaims)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedUserTypes = route.data?.['allowedUserTypes'] as string[];
    
    if (!allowedUserTypes || allowedUserTypes.length === 0) {
      return true;
    }

    const currentUser = this.authService.getCurrentUser();
    if (currentUser && allowedUserTypes.includes(currentUser.userType)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}

