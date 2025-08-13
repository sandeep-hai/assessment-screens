import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Event, Poll, Exam } from '../../../core/models/user.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  dashboardStats: any = {};
  upcomingEvents$: Observable<Event[]>;
  activePolls$: Observable<Poll[]>;
  availableExams$: Observable<Exam[]>;

  constructor(private mockDataService: MockDataService) {
    this.upcomingEvents$ = this.mockDataService.events$;
    this.activePolls$ = this.mockDataService.polls$;
    this.availableExams$ = this.mockDataService.exams$;
  }

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  private loadDashboardStats(): void {
    this.mockDataService.getDashboardStats().subscribe(stats => {
      this.dashboardStats = {
        ...stats,
        pendingExams: 5,
        completedAssignments: 12,
        upcomingEvents: 3,
        currentGrade: 'A-'
      };
    });
  }
}