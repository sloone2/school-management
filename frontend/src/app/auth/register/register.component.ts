// Integration code for your existing register component
// Add this to your existing register.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  error = '';
  userTypes = [
    { value: 'student', label: 'Student' },
    { value: 'parent', label: 'Parent' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      // Student fields
      studentId: [''],
      grade: [''],
      dateOfBirth: [''],
      // Parent fields
      phone: [''],
      relationship: [''],
      emergencyContact: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    // Watch for user type changes to update validators
    this.registerForm.get('userType')?.valueChanges.subscribe(userType => {
      this.updateValidators(userType);
    });
  }

  private updateValidators(userType: string): void {
    // Clear all conditional validators first
    this.clearConditionalValidators();

    if (userType === 'student') {
      this.registerForm.get('studentId')?.setValidators([Validators.required]);
      this.registerForm.get('grade')?.setValidators([Validators.required]);
    } else if (userType === 'parent') {
      this.registerForm.get('phone')?.setValidators([Validators.required]);
      this.registerForm.get('relationship')?.setValidators([Validators.required]);
    }

    // Update validity
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.updateValueAndValidity();
    });
  }

  private clearConditionalValidators(): void {
    const conditionalFields = ['studentId', 'grade', 'phone', 'relationship'];
    conditionalFields.forEach(field => {
      this.registerForm.get(field)?.clearValidators();
      this.registerForm.get(field)?.updateValueAndValidity();
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      const formValue = this.registerForm.value;
      const registerData: RegisterRequest = {
        email: formValue.email,
        password: formValue.password,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        userType: formValue.userType
      };

      // Add conditional fields based on user type
      if (formValue.userType === 'student') {
        registerData.studentId = formValue.studentId;
        registerData.grade = formValue.grade;
        if (formValue.dateOfBirth) {
          registerData.dateOfBirth = formValue.dateOfBirth;
        }
      } else if (formValue.userType === 'parent') {
        registerData.phone = formValue.phone;
        registerData.relationship = formValue.relationship;
        if (formValue.emergencyContact) {
          registerData.emergencyContact = formValue.emergencyContact;
        }
      }

      const response = await this.authService.register(registerData);
      
      // Success - redirect to dashboard
      this.router.navigate(['/dashboard']);
      
    } catch (error: any) {
      this.error = error.message || 'Registration failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  get userType() { return this.registerForm.get('userType')?.value; }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `Password must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      userType: 'User Type',
      studentId: 'Student ID',
      grade: 'Grade',
      phone: 'Phone Number',
      relationship: 'Relationship'
    };
    return labels[fieldName] || fieldName;
  }

  shouldShowField(fieldName: string): boolean {
    const userType = this.userType;
    const studentFields = ['studentId', 'grade', 'dateOfBirth'];
    const parentFields = ['phone', 'relationship', 'emergencyContact'];

    if (studentFields.includes(fieldName)) {
      return userType === 'student';
    }
    if (parentFields.includes(fieldName)) {
      return userType === 'parent';
    }
    return true;
  }
}

// Add this to your register.component.html template integration:
/*
<form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
  <!-- Basic Information -->
  <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label for="firstName">First Name *</label>
        <input 
          type="text" 
          id="firstName" 
          formControlName="firstName"
          class="form-control"
          [class.is-invalid]="isFieldInvalid('firstName')"
        >
        <div class="invalid-feedback" *ngIf="isFieldInvalid('firstName')">
          {{ getFieldError('firstName') }}
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label for="lastName">Last Name *</label>
        <input 
          type="text" 
          id="lastName" 
          formControlName="lastName"
          class="form-control"
          [class.is-invalid]="isFieldInvalid('lastName')"
        >
        <div class="invalid-feedback" *ngIf="isFieldInvalid('lastName')">
          {{ getFieldError('lastName') }}
        </div>
      </div>
    </div>
  </div>

  <div class="form-group">
    <label for="email">Email Address *</label>
    <input 
      type="email" 
      id="email" 
      formControlName="email"
      class="form-control"
      [class.is-invalid]="isFieldInvalid('email')"
    >
    <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
      {{ getFieldError('email') }}
    </div>
  </div>

  <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label for="password">Password *</label>
        <input 
          type="password" 
          id="password" 
          formControlName="password"
          class="form-control"
          [class.is-invalid]="isFieldInvalid('password')"
        >
        <div class="invalid-feedback" *ngIf="isFieldInvalid('password')">
          {{ getFieldError('password') }}
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label for="confirmPassword">Confirm Password *</label>
        <input 
          type="password" 
          id="confirmPassword" 
          formControlName="confirmPassword"
          class="form-control"
          [class.is-invalid]="isFieldInvalid('confirmPassword')"
        >
        <div class="invalid-feedback" *ngIf="isFieldInvalid('confirmPassword')">
          {{ getFieldError('confirmPassword') }}
        </div>
      </div>
    </div>
  </div>

  <div class="form-group">
    <label for="userType">I am a *</label>
    <select 
      id="userType" 
      formControlName="userType"
      class="form-control"
      [class.is-invalid]="isFieldInvalid('userType')"
    >
      <option value="">Select user type</option>
      <option *ngFor="let type of userTypes" [value]="type.value">
        {{ type.label }}
      </option>
    </select>
    <div class="invalid-feedback" *ngIf="isFieldInvalid('userType')">
      {{ getFieldError('userType') }}
    </div>
  </div>

  <!-- Student-specific fields -->
  <div *ngIf="shouldShowField('studentId')" class="student-fields">
    <h5>Student Information</h5>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="studentId">Student ID *</label>
          <input 
            type="text" 
            id="studentId" 
            formControlName="studentId"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('studentId')"
          >
          <div class="invalid-feedback" *ngIf="isFieldInvalid('studentId')">
            {{ getFieldError('studentId') }}
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="grade">Grade *</label>
          <input 
            type="text" 
            id="grade" 
            formControlName="grade"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('grade')"
            placeholder="e.g., Grade 10"
          >
          <div class="invalid-feedback" *ngIf="isFieldInvalid('grade')">
            {{ getFieldError('grade') }}
          </div>
        </div>
      </div>
    </div>
    <div class="form-group" *ngIf="shouldShowField('dateOfBirth')">
      <label for="dateOfBirth">Date of Birth</label>
      <input 
        type="date" 
        id="dateOfBirth" 
        formControlName="dateOfBirth"
        class="form-control"
      >
    </div>
  </div>

  <!-- Parent-specific fields -->
  <div *ngIf="shouldShowField('phone')" class="parent-fields">
    <h5>Parent Information</h5>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="phone">Phone Number *</label>
          <input 
            type="tel" 
            id="phone" 
            formControlName="phone"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('phone')"
          >
          <div class="invalid-feedback" *ngIf="isFieldInvalid('phone')">
            {{ getFieldError('phone') }}
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="relationship">Relationship *</label>
          <select 
            id="relationship" 
            formControlName="relationship"
            class="form-control"
            [class.is-invalid]="isFieldInvalid('relationship')"
          >
            <option value="">Select relationship</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="guardian">Guardian</option>
            <option value="other">Other</option>
          </select>
          <div class="invalid-feedback" *ngIf="isFieldInvalid('relationship')">
            {{ getFieldError('relationship') }}
          </div>
        </div>
      </div>
    </div>
    <div class="form-group" *ngIf="shouldShowField('emergencyContact')">
      <label for="emergencyContact">Emergency Contact</label>
      <input 
        type="tel" 
        id="emergencyContact" 
        formControlName="emergencyContact"
        class="form-control"
        placeholder="Alternative contact number"
      >
    </div>
  </div>

  <div class="alert alert-danger" *ngIf="error">
    {{ error }}
  </div>

  <button 
    type="submit" 
    class="btn btn-primary btn-block"
    [disabled]="loading || registerForm.invalid"
  >
    <span *ngIf="loading" class="spinner-border spinner-border-sm mr-2"></span>
    {{ loading ? 'Creating Account...' : 'Create Account' }}
  </button>

  <div class="text-center mt-3">
    <a routerLink="/auth/login" class="text-primary">
      Already have an account? Sign in here
    </a>
  </div>
</form>
*/

