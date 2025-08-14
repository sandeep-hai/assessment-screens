import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private snackBar: MatSnackBar
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
            this.snackBar.open('OTP sent successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/auth/verify-otp'], { queryParams: { email } });
          } else {
            this.snackBar.open('User not found!', 'Close', { duration: 3000 });
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open('Error sending OTP', 'Close', { duration: 3000 });
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