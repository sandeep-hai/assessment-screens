import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Event, Poll } from '../../../core/models/user.model';
import { CreateEventDialogComponent } from './create-event-dialog/create-event-dialog.component';
import { AuthService } from '../../../core/services/auth.service';
import { NavigationComponent } from '../../../shared/components/navigation/navigation.component';

@Component({
  selector: 'app-student-events',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    NavigationComponent
  ],
  templateUrl: './student-events.component.html',
  styleUrls: ['./student-events.component.css']
})
export class StudentEventsComponent implements OnInit {
  events$: Observable<Event[]>;
  polls$: Observable<Poll[]>;

  constructor(
    private mockDataService: MockDataService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.events$ = this.mockDataService.events$;
    this.polls$ = this.mockDataService.polls$;
  }

  ngOnInit(): void {}

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.firstName : 'Student';
  }

  openCreatePostDialog(): void {
    console.log('Opening create post dialog...');
    alert('Create post feature coming soon!');
  }

  openCreatePostDialog(): void {
    console.log('Opening create post dialog...');
    alert('Create post feature coming soon!');
  }

  openCreateEventDialog(): void {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '600px',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mockDataService.createEvent(result).subscribe();
      }
    });
  }

  createPoll(): void {
    console.log('Creating poll...');
    alert('Create poll feature coming soon!');
  }

  sharePhoto(): void {
    console.log('Sharing photo...');
    alert('Share photo feature coming soon!');
  }

  joinEvent(event: Event): void {
    console.log('Joining event:', event.title);
    alert(`Joined event: ${event.title}`);
  }

  vote(poll: Poll, option: string): void {
    console.log('Voting for:', option, 'in poll:', poll.question);
    poll.votes[option] = (poll.votes[option] || 0) + 1;
    poll.totalVotes++;
    alert(`Voted for: ${option}`);
  }

  likePost(item: any): void {
    console.log('Liked:', item.title || item.question);
    item.likes = (item.likes || 0) + 1;
  }

  commentOnPost(item: any): void {
    console.log('Comment on:', item.title || item.question);
    alert('Comment feature coming soon!');
  }

  sharePost(item: any): void {
    console.log('Shared:', item.title || item.question);
    alert('Share feature coming soon!');
  }

  getEventTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      'webinar': '#1877f2',
      'workshop': '#42b883',
      'seminar': '#ff6b6b',
      'conference': '#1877f2',
      'exam': '#ff6b6b',
      'assignment': '#42b883'
    };
    return colors[type] || '#1877f2';
  }

  getVotePercentage(poll: Poll, option: string): number {
    if (poll.totalVotes === 0) return 0;
    return ((poll.votes[option] || 0) / poll.totalVotes) * 100;
  }
}