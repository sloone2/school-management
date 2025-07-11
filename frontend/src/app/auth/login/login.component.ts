// Integration code for your existing login component
// Add this to your existing login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, LoginRequest } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Get return url from route parameters or default to dashboard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      const loginData: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      const response = await this.authService.login(loginData);
      
      // Success - redirect to return URL or dashboard
      this.router.navigate([this.returnUrl]);
      
    } catch (error: any) {
      this.error = error.message || 'Login failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
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
        return `Password must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}

// Add this to your login.component.html template integration:
/*
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
  <div class="form-group">
    <label for="email">Email Address</label>
    <input 
      type="email" 
      id="email" 
      formControlName="email"
      class="form-control"
      [class.is-invalid]="isFieldInvalid('email')"
      placeholder="Enter your email"
    >
    <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
      {{ getFieldError('email') }}
    </div>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input 
      type="password" 
      id="password" 
      formControlName="password"
      class="form-control"
      [class.is-invalid]="isFieldInvalid('password')"
      placeholder="Enter your password"
    >
    <div class="invalid-feedback" *ngIf="isFieldInvalid('password')">
      {{ getFieldError('password') }}
    </div>
  </div>

  <div class="alert alert-danger" *ngIf="error">
    {{ error }}
  </div>

  <button 
    type="submit" 
    class="btn btn-primary btn-block"
    [disabled]="loading || loginForm.invalid"
  >
    <span *ngIf="loading" class="spinner-border spinner-border-sm mr-2"></span>
    {{ loading ? 'Signing In...' : 'Sign In' }}
  </button>

  <div class="text-center mt-3">
    <a routerLink="/auth/register" class="text-primary">
      Don't have an account? Register here
    </a>
  </div>
</form>
*/

