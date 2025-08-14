import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #c2185b, #8e0038); padding: 16px;">
      <mat-card style="width: 100%; max-width: 400px; padding: 24px;">
        <mat-card-header>
          <mat-card-title style="text-align: center;">Assessment Tool</mat-card-title>
          <mat-card-subtitle style="text-align: center;">Sign in to continue</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content style="padding: 24px 0;">
          <mat-form-field style="width: 100%;" appearance="outline">
            <mat-label>Email Address</mat-label>
            <input matInput type="email" placeholder="Enter your email">
          </mat-form-field>
        </mat-card-content>
        
        <mat-card-actions style="text-align: center;">
          <button mat-raised-button color="primary" style="width: 100%;" (click)="login()">
            Send OTP
          </button>
        </mat-card-actions>
        
        <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin-top: 16px; font-size: 14px;">
          <h4 style="margin: 0 0 12px 0; color: #c2185b;">Demo Credentials:</h4>
          <p style="margin: 8px 0;">Click "Send OTP" to proceed to dashboard</p>
        </div>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/dashboard']);
  }
}