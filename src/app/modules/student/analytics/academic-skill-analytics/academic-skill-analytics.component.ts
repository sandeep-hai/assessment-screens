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

interface TimeframeTrendData {
  label: string;
  data: number[];
}

interface TimeframeTrends {
  day: TimeframeTrendData;
  week: TimeframeTrendData;
  month: TimeframeTrendData;
  year: TimeframeTrendData;
}

@Component({
  selector: 'app-academic-skill-analytics',
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
  templateUrl: './academic-skill-analytics.component.html',
  styleUrls: ['./academic-skill-analytics.component.css']
})
export class AcademicSkillAnalyticsComponent implements OnInit {
  selectedTimeframe: keyof TimeframeTrends = 'month';
  selectedCourse = 'all';

  courseData = [
    {
      name: 'Computer Science',
      subjects: [
        {
          name: 'Data Structures',
          topics: [
            { name: 'Arrays', proficiency: 85, trend: '+5%' },
            { name: 'Linked Lists', proficiency: 78, trend: '+3%' },
            { name: 'Trees', proficiency: 72, trend: '+8%' }
          ]
        },
        {
          name: 'Algorithms',
          topics: [
            { name: 'Sorting', proficiency: 90, trend: '+2%' },
            { name: 'Searching', proficiency: 88, trend: '+4%' },
            { name: 'Graph Algorithms', proficiency: 65, trend: '+12%' }
          ]
        }
      ]
    }
  ];

  timeframeTrends: TimeframeTrends = {
    day: { label: 'Daily Progress', data: [75, 78, 82, 79, 85, 88, 90] },
    week: { label: 'Weekly Progress', data: [70, 75, 80, 85, 88] },
    month: { label: 'Monthly Progress', data: [65, 70, 75, 82, 88] },
    year: { label: 'Yearly Progress', data: [60, 68, 75, 82, 88] }
  };

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

  getProficiencyColor(proficiency: number): string {
    if (proficiency >= 80) return '#4caf50';
    if (proficiency >= 60) return '#ff9800';
    return '#f44336';
  }

  getTrendColor(trend: string): string {
    return trend.startsWith('+') ? '#4caf50' : '#f44336';
  }
}