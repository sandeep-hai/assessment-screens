import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  selectedUserEmail = '';

  // Demo users with their OTPs
  private demoUsers = {
    'student1@humera.ai': { otp: '111111', role: UserRole.STUDENT },
    'lecturer1@humera.ai': { otp: '222222', role: UserRole.LECTURER },
    'collegeadmin@humera.ai': { otp: '333333', role: UserRole.COLLEGE_ADMIN },
    'appadmin@humera.ai': { otp: '444444', role: UserRole.APP_ADMIN }
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Login page is the homepage - no auto-redirect
    console.log('Login component initialized');
  }

  selectUser(email: string): void {
    console.log('Selecting user:', email);
    this.selectedUserEmail = email;
    this.loginForm.patchValue({ email });
    
    // Auto-login for demo purposes
    this.quickLogin(email);
  }

  private quickLogin(email: string): void {
    const demoUser = this.demoUsers[email as keyof typeof this.demoUsers];
    if (!demoUser) {
      console.error('Demo user not found:', email);
      return;
    }

    this.isLoading = true;
    console.log('Starting quick login for:', email);

    // Simulate sending OTP
    this.authService.sendOTP(email).subscribe({
      next: (success) => {
        if (success) {
          console.log('OTP sent, now verifying automatically...');
          // Auto-verify with the correct OTP
          this.authService.verifyOTP(email, demoUser.otp).subscribe({
            next: (response) => {
              this.isLoading = false;
              console.log('Auto-login successful for:', response.user.role);
              this.redirectBasedOnRole(response.user.role);
            },
            error: (error) => {
              this.isLoading = false;
              console.error('Auto-verification failed:', error);
              // Fallback to manual OTP entry
              this.router.navigate(['/auth/verify-otp'], { queryParams: { email } });
            }
          });
        } else {
          this.isLoading = false;
          console.error('Failed to send OTP for:', email);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error in quick login:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const email = this.loginForm.get('email')?.value;
      console.log('Manual login attempt for:', email);

      this.authService.sendOTP(email).subscribe({
        next: (success) => {
          this.isLoading = false;
          if (success) {
            console.log('OTP sent successfully for manual login');
            this.router.navigate(['/auth/verify-otp'], { queryParams: { email } });
          } else {
            console.log('User not found:', email);
            alert('User not found! Please use one of the demo emails.');
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error sending OTP:', error);
          alert('Error sending OTP. Please try again.');
        }
      });
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  private redirectBasedOnRole(role: UserRole): void {
    console.log('Redirecting based on role:', role);
    switch (role) {
      case UserRole.STUDENT:
        this.router.navigate(['/student/dashboard']);
        break;
      case UserRole.LECTURER:
        this.router.navigate(['/lecturer/dashboard']);
        break;
      case UserRole.COLLEGE_ADMIN:
        this.router.navigate(['/college-admin/dashboard']);
        break;
      case UserRole.APP_ADMIN:
        this.router.navigate(['/app-admin/dashboard']);
        break;
      default:
        console.error('Unknown role:', role);
        this.router.navigate(['/']);
    }
  }
}