import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/user.model';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class OtpVerificationComponent implements OnInit {
  otpForm: FormGroup;
  isLoading = false;
  email = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'] || '';
    if (!this.email) {
      this.router.navigate(['/auth/login']);
    }
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      this.isLoading = true;
      const otp = this.otpForm.get('otp')?.value;

      this.authService.verifyOTP(this.email, otp).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Login successful!');
          this.redirectBasedOnRole(response.user.role);
        },
        error: (error) => {
          this.isLoading = false;
          console.log('Invalid OTP. Please try again.');
        }
      });
    }
  }

  resendOTP(): void {
    this.authService.sendOTP(this.email).subscribe({
      next: (success) => {
        if (success) {
          console.log('OTP resent successfully!');
        }
      },
      error: (error) => {
        console.log('Error resending OTP');
      }
    });
  }

  private redirectBasedOnRole(role: UserRole): void {
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
        this.router.navigate(['/']);
    }
  }
}