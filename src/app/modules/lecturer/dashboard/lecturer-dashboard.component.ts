import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-lecturer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './lecturer-dashboard.component.html',
  styleUrls: ['./lecturer-dashboard.component.css']
})
export class LecturerDashboardComponent implements OnInit {
  dashboardStats = {
    totalExams: 15,
    pendingEvaluations: 23,
    totalStudents: 156,
    averageScore: 78.5
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? `${user.firstName} ${user.lastName}` : 'Lecturer';
  }

  logout(): void {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Navigation methods
  navigateToExams(): void {
    console.log('Navigating to exams management...');
    alert('Exams management feature coming soon!');
  }

  navigateToEvaluations(): void {
    console.log('Navigating to evaluations...');
    alert('Evaluations feature coming soon!');
  }

  navigateToStudents(): void {
    console.log('Navigating to students...');
    alert('Students management feature coming soon!');
  }

  navigateToEvents(): void {
    console.log('Navigating to events...');
    alert('Events management feature coming soon!');
  }

  createExam(): void {
    console.log('Creating new exam...');
    alert('Create exam feature coming soon!');
  }
}