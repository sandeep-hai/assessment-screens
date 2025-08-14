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
    MatProgressSpinnerModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

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
    // Check if already logged in
    if (this.authService.isAuthenticated()) {
      this.redirectBasedOnRole();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const email = this.loginForm.get('email')?.value;

      this.authService.sendOTP(email).subscribe({
        next: (success) => {
          this.isLoading = false;
          if (success) {
            console.log('OTP sent successfully!');
            this.router.navigate(['/auth/verify-otp'], { queryParams: { email } });
          } else {
            console.log('User not found!');
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.log('Error sending OTP');
        }
      });
    }
  }

  private redirectBasedOnRole(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      switch (user.role) {
        case UserRole.STUDENT:
          this.router.navigate(['/student']);
          break;
        case UserRole.LECTURER:
          this.router.navigate(['/lecturer']);
          break;
        case UserRole.COLLEGE_ADMIN:
          this.router.navigate(['/college-admin']);
          break;
        case UserRole.APP_ADMIN:
          this.router.navigate(['/app-admin']);
          break;
        default:
          this.router.navigate(['/']);
      }
    }
  }
}