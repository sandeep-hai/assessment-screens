import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-exam-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTabsModule
  ],
  templateUrl: './exam-analytics.component.html',
  styleUrls: ['./exam-analytics.component.css']
})
export class ExamAnalyticsComponent implements OnInit {
  overallStats = {
    totalExams: 25,
    averageScore: 78.5,
    highestScore: 95,
    lowestScore: 62,
    improvementTrend: '+5.2%'
  };

  performanceData = [
    { subject: 'Computer Science', exams: 8, average: 82, trend: '+3%' },
    { subject: 'Mathematics', exams: 6, average: 75, trend: '+7%' },
    { subject: 'Physics', exams: 5, average: 78, trend: '-2%' },
    { subject: 'English', exams: 6, average: 85, trend: '+4%' }
  ];

  recentExams = [
    { title: 'CS Fundamentals', date: '2024-01-15', score: 85, grade: 'A' },
    { title: 'Calculus Quiz', date: '2024-01-12', score: 78, grade: 'B+' },
    { title: 'Physics Lab', date: '2024-01-10', score: 92, grade: 'A+' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? `${user.firstName} ${user.lastName}` : 'Student';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getTrendColor(trend: string): string {
    return trend.startsWith('+') ? '#4caf50' : trend.startsWith('-') ? '#f44336' : '#666';
  }

  getGradeColor(grade: string): string {
    const colors: { [key: string]: string } = {
      'A+': '#4caf50', 'A': '#4caf50', 'B+': '#8bc34a', 'B': '#8bc34a',
      'C+': '#ffc107', 'C': '#ffc107', 'D': '#ff9800', 'F': '#f44336'
    };
    return colors[grade] || '#666';
  }
}