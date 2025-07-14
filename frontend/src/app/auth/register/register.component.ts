import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { welcomeLogin } from 'src/app/models/model';
import { DataService } from 'src/app/shared/service/data/data.service';
import { ApiService, RegisterRequest } from 'src/app/shared/service/api/api.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  routes = routes;
  public welcomeLogin: welcomeLogin[] = [];
  public registerForm!: FormGroup; // Use definite assignment assertion
  public isLoading = false;
  public errorMessage = '';
  password: boolean[] = [false, false]; // For password and confirm password

  togglePassword(index: number): void {
    this.password[index] = !this.password[index];
  }

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
  }

  constructor(
    private DataService: DataService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public router: Router
  ) {
    this.welcomeLogin = this.DataService.welcomeLogin;
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      userType: ['', [Validators.required]],
      // Student-specific fields
      studentId: [''],
      dateOfBirth: [''],
      grade: [''],
      canLoginDirectly: [false],
      // Parent-specific fields
      phone: [''],
      relationship: ['']
    }, { validators: this.passwordMatchValidator });

    // Watch userType changes to set conditional validators
    this.registerForm.get('userType')?.valueChanges.subscribe(userType => {
      this.updateValidators(userType);
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    // Fix null safety issue
    if (confirmPassword?.hasError('passwordMismatch')) {
      const errors = confirmPassword.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
    }
    
    return null;
  }

  private updateValidators(userType: string): void {
    const studentIdControl = this.registerForm.get('studentId');
    const relationshipControl = this.registerForm.get('relationship');

    // Clear existing validators
    studentIdControl?.clearValidators();
    relationshipControl?.clearValidators();

    if (userType === 'student') {
      studentIdControl?.setValidators([Validators.required]);
    } else if (userType === 'parent') {
      relationshipControl?.setValidators([Validators.required]);
    }

    studentIdControl?.updateValueAndValidity();
    relationshipControl?.updateValueAndValidity();
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const formValue = this.registerForm.value;
      const userData: RegisterRequest = {
        email: formValue.email,
        password: formValue.password,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        userType: formValue.userType
      };

      // Add user-type specific fields
      if (formValue.userType === 'student') {
        userData.studentId = formValue.studentId;
        userData.dateOfBirth = formValue.dateOfBirth;
        userData.grade = formValue.grade;
        userData.canLoginDirectly = formValue.canLoginDirectly;
      } else if (formValue.userType === 'parent') {
        userData.phone = formValue.phone;
        userData.relationship = formValue.relationship;
      }

      const response = await this.apiService.register(userData);
      
      // Redirect based on user type
      this.redirectUser(response.user);
      
    } catch (error: any) {
      this.errorMessage = error.message || 'Registration failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  private redirectUser(user: any): void {
    // Redirect based on user type
    switch (user.userType) {
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
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      userType: 'User Type',
      studentId: 'Student ID',
      dateOfBirth: 'Date of Birth',
      grade: 'Grade',
      phone: 'Phone Number',
      relationship: 'Relationship'
    };
    return displayNames[fieldName] || fieldName;
  }

  get selectedUserType(): string {
    return this.registerForm.get('userType')?.value || '';
  }

  // Password strength validation
  passwordValue: string = '';
  strengthLevel: string = '';
  passwordInfoMessage: string | null = null;
  passwordInfoColor: string = '';

  private poorRegExp = /[a-z]/;
  private weakRegExp = /(?=.*?[0-9])/;
  private strongRegExp = /(?=.*?[#?!@$%^&*-])/;
  private whitespaceRegExp = /^$|\s+/;

  checkPasswordStrength(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const password = inputElement.value;
    this.passwordValue = password;

    const passwordLength = password.length;
    const hasPoor = this.poorRegExp.test(password);
    const hasWeak = this.weakRegExp.test(password);
    const hasStrong = this.strongRegExp.test(password);
    const hasWhitespace = this.whitespaceRegExp.test(password);

    if (password === '') {
      this.resetStrength();
      return;
    }

    if (hasWhitespace) {
      this.passwordInfoMessage = 'Whitespaces are not allowed';
      this.passwordInfoColor = 'red';
      this.strengthLevel = '';
      return;
    }

    if (passwordLength < 8) {
      this.strengthLevel = 'poor';
      this.passwordInfoMessage = 'Weak. Must contain at least 8 characters.';
      this.passwordInfoColor = 'red';
    } else if (hasPoor || hasWeak || hasStrong) {
      this.strengthLevel = 'weak';
      this.passwordInfoMessage = 'Average. Must contain at least 1 letter or number.';
      this.passwordInfoColor = '#FFB54A';
    }

    if (passwordLength >= 8 && hasPoor && (hasWeak || hasStrong)) {
      this.strengthLevel = 'strong';
      this.passwordInfoMessage = 'Almost strong. Must contain a special symbol.';
      this.passwordInfoColor = '#1D9CFD';
    }

    if (passwordLength >= 8 && hasPoor && hasWeak && hasStrong) {
      this.strengthLevel = 'heavy';
      this.passwordInfoMessage = 'Awesome! You have a secure password.';
      this.passwordInfoColor = '#159F46';
    }
  }

  private resetStrength(): void {
    this.strengthLevel = '';
    this.passwordInfoMessage = null;
  }
}
