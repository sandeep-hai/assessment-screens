import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Event, Poll, Exam, User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatToolbarModule
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  dashboardStats: any = {};
  upcomingEvents$: Observable<Event[]>;
  activePolls$: Observable<Poll[]>;
  availableExams$: Observable<Exam[]>;

  constructor(
    private mockDataService: MockDataService,
    private authService: AuthService,
    private router: Router
  ) {
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

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? `${user.firstName} ${user.lastName}` : 'Student';
  }

  logout(): void {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Navigation methods
  navigateToExams(): void {
    console.log('Navigating to exams...');
    this.router.navigate(['/student/exams']);
  }

  navigateToAssignments(): void {
    console.log('Navigating to assignments...');
    this.router.navigate(['/student/assignments']);
  }

  navigateToEvents(): void {
    console.log('Navigating to events...');
    this.router.navigate(['/student/events']);
  }

  navigateToPolls(): void {
    console.log('Navigating to polls...');
    this.router.navigate(['/student/polls']);
  }

  takeExam(examId: string): void {
    console.log('Taking exam:', examId);
    this.router.navigate(['/student/take-exam', examId]);
  }

  joinEvent(event: Event): void {
    console.log('Joining event:', event.title);
    // Mock join event logic
    alert(`Joined event: ${event.title}`);
  }

  vote(poll: Poll, option: string): void {
    console.log('Voting for:', option, 'in poll:', poll.question);
    // Mock voting logic - in real app this would call a service
    poll.votes[option] = (poll.votes[option] || 0) + 1;
    poll.totalVotes++;
    alert(`Voted for: ${option}`);
  }

  likePost(item: any): void {
    console.log('Liked:', item.title || item.question);
    alert('Post liked!');
  }

  commentOnPost(item: any): void {
    console.log('Comment on:', item.title || item.question);
    alert('Comment feature coming soon!');
  }

  sharePost(item: any): void {
    console.log('Shared:', item.title || item.question);
    alert('Post shared!');
  }

  savePost(item: any): void {
    console.log('Saved:', item.title || item.question);
    alert('Post saved!');
  }
}