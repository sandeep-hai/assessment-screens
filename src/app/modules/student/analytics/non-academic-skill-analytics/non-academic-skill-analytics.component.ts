import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-non-academic-skill-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  templateUrl: './non-academic-skill-analytics.component.html',
  styleUrls: ['./non-academic-skill-analytics.component.css']
})
export class NonAcademicSkillAnalyticsComponent implements OnInit {
  conceptualSkills = [
    { name: 'Problem Solving', level: 85, category: 'Cognitive' },
    { name: 'Critical Thinking', level: 78, category: 'Cognitive' },
    { name: 'Communication', level: 82, category: 'Interpersonal' },
    { name: 'Leadership', level: 70, category: 'Interpersonal' },
    { name: 'Time Management', level: 88, category: 'Personal' },
    { name: 'Adaptability', level: 75, category: 'Personal' }
  ];

  techStack = [
    { name: 'JavaScript', proficiency: 90, experience: '2 years', category: 'Frontend' },
    { name: 'React', proficiency: 85, experience: '1.5 years', category: 'Frontend' },
    { name: 'Node.js', proficiency: 75, experience: '1 year', category: 'Backend' },
    { name: 'Python', proficiency: 80, experience: '1.5 years', category: 'Backend' },
    { name: 'MongoDB', proficiency: 70, experience: '8 months', category: 'Database' },
    { name: 'Git', proficiency: 88, experience: '2 years', category: 'Tools' }
  ];

  cibilScore = {
    score: 750,
    rating: 'Good',
    factors: [
      { name: 'Payment History', impact: 'Positive', weight: 35 },
      { name: 'Credit Utilization', impact: 'Neutral', weight: 30 },
      { name: 'Length of Credit History', impact: 'Limited', weight: 15 },
      { name: 'Credit Mix', impact: 'Positive', weight: 10 },
      { name: 'New Credit', impact: 'Neutral', weight: 10 }
    ]
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

  getSkillColor(level: number): string {
    if (level >= 80) return '#4caf50';
    if (level >= 60) return '#ff9800';
    return '#f44336';
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Cognitive': '#2196f3',
      'Interpersonal': '#9c27b0',
      'Personal': '#ff9800',
      'Frontend': '#4caf50',
      'Backend': '#f44336',
      'Database': '#ff5722',
      'Tools': '#607d8b'
    };
    return colors[category] || '#666';
  }

  getCibilRatingColor(rating: string): string {
    const colors: { [key: string]: string } = {
      'Excellent': '#4caf50',
      'Very Good': '#8bc34a',
      'Good': '#ffc107',
      'Fair': '#ff9800',
      'Poor': '#f44336'
    };
    return colors[rating] || '#666';
  }

  getImpactColor(impact: string): string {
    const colors: { [key: string]: string } = {
      'Positive': '#4caf50',
      'Neutral': '#ff9800',
      'Negative': '#f44336',
      'Limited': '#9e9e9e'
    };
    return colors[impact] || '#666';
  }
}