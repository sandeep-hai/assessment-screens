import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div style="padding: 24px; background-color: #fafafa; min-height: 100vh;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="margin-bottom: 32px; text-align: center;">
          <h1 style="color: #c2185b; margin-bottom: 8px;">Student Dashboard</h1>
          <p style="color: rgba(0, 0, 0, 0.54); font-size: 16px;">Welcome back! Here's what's happening today.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 32px;">
          <mat-card style="text-align: center; padding: 24px; background: linear-gradient(135deg, #c2185b, #8e0038); color: white;">
            <mat-icon style="font-size: 48px; width: 48px; height: 48px; margin-bottom: 16px;">assignment</mat-icon>
            <h3>5</h3>
            <p>Pending Exams</p>
          </mat-card>

          <mat-card style="text-align: center; padding: 24px; background: linear-gradient(135deg, #c2185b, #8e0038); color: white;">
            <mat-icon style="font-size: 48px; width: 48px; height: 48px; margin-bottom: 16px;">assignment_turned_in</mat-icon>
            <h3>12</h3>
            <p>Completed Assignments</p>
          </mat-card>

          <mat-card style="text-align: center; padding: 24px; background: linear-gradient(135deg, #c2185b, #8e0038); color: white;">
            <mat-icon style="font-size: 48px; width: 48px; height: 48px; margin-bottom: 16px;">event</mat-icon>
            <h3>3</h3>
            <p>Upcoming Events</p>
          </mat-card>

          <mat-card style="text-align: center; padding: 24px; background: linear-gradient(135deg, #c2185b, #8e0038); color: white;">
            <mat-icon style="font-size: 48px; width: 48px; height: 48px; margin-bottom: 16px;">grade</mat-icon>
            <h3>A-</h3>
            <p>Current Grade</p>
          </mat-card>
        </div>

        <mat-card style="padding: 24px;">
          <h2 style="color: #c2185b; margin-bottom: 16px;">Available Exams</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
            <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px;">
              <h4 style="color: #c2185b; margin: 0 0 8px 0;">CS101 - Module 1 Test</h4>
              <p style="color: rgba(0, 0, 0, 0.54); font-size: 14px; margin-bottom: 12px;">Basic programming concepts test</p>
              <div style="display: flex; gap: 16px; margin: 12px 0; font-size: 14px; color: rgba(0, 0, 0, 0.54);">
                <span><mat-icon style="font-size: 16px; width: 16px; height: 16px; vertical-align: middle; margin-right: 4px;">schedule</mat-icon>60 min</span>
                <span><mat-icon style="font-size: 16px; width: 16px; height: 16px; vertical-align: middle; margin-right: 4px;">grade</mat-icon>100 marks</span>
              </div>
              <button mat-raised-button color="primary" style="width: 100%; margin-top: 16px;">Take Exam</button>
            </div>
          </div>
        </mat-card>
      </div>
    </div>
  `
})
export class DashboardComponent {}