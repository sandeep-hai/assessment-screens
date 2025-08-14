import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, MatDividerModule],
  template: `
    <div style="background-color: #fafafa; min-height: 100vh;">
      <!-- Header with logout -->
      <div style="background: white; padding: 16px 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 24px;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
          <h2 style="color: #c2185b; margin: 0;">Assessment Tool</h2>
          <button mat-raised-button color="warn" (click)="logout()">
            <mat-icon style="margin-right: 8px;">logout</mat-icon>
            Switch User
          </button>
        </div>
      </div>

      <div style="padding: 0 24px;">
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

        <!-- Feed Section -->
        <mat-card style="padding: 24px; margin-bottom: 24px;">
          <h2 style="color: #c2185b; margin-bottom: 24px; display: flex; align-items: center;">
            <mat-icon style="margin-right: 8px;">dynamic_feed</mat-icon>
            Activity Feed
          </h2>
          
          <!-- Events Feed -->
          <div *ngFor="let event of events" style="border: 1px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; background: white;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #c2185b, #8e0038); display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <mat-icon style="color: white; font-size: 20px;">event</mat-icon>
              </div>
              <div>
                <h4 style="margin: 0; color: #333;">{{ event.title }}</h4>
                <p style="margin: 0; color: #666; font-size: 14px;">{{ event.date }}</p>
              </div>
              <mat-chip style="margin-left: auto;" [style.background-color]="event.type === 'webinar' ? '#2196f3' : '#4caf50'" style="color: white;">
                {{ event.type }}
              </mat-chip>
            </div>
            <p style="color: #555; margin-bottom: 12px;">{{ event.description }}</p>
            <div style="display: flex; align-items: center; gap: 16px; color: #666; font-size: 14px; margin-bottom: 12px;">
              <span><mat-icon style="font-size: 16px; margin-right: 4px;">schedule</mat-icon>{{ event.time }}</span>
              <span><mat-icon style="font-size: 16px; margin-right: 4px;">{{ event.isVirtual ? 'videocam' : 'location_on' }}</mat-icon>{{ event.location }}</span>
            </div>
            <mat-divider style="margin: 12px 0;"></mat-divider>
            <div style="display: flex; gap: 12px;">
              <button mat-raised-button color="primary" size="small">Join Event</button>
              <button mat-button size="small">
                <mat-icon style="margin-right: 4px;">share</mat-icon>Share
              </button>
              <button mat-button size="small">
                <mat-icon style="margin-right: 4px;">bookmark</mat-icon>Save
              </button>
            </div>
          </div>

          <!-- Polls Feed -->
          <div *ngFor="let poll of polls" style="border: 1px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px; background: white;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #4caf50, #2e7d32); display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <mat-icon style="color: white; font-size: 20px;">poll</mat-icon>
              </div>
              <div>
                <h4 style="margin: 0; color: #333;">Poll</h4>
                <p style="margin: 0; color: #666; font-size: 14px;">{{ poll.date }}</p>
              </div>
              <mat-chip style="margin-left: auto; background-color: #4caf50; color: white;">Active</mat-chip>
            </div>
            <h3 style="color: #333; margin-bottom: 16px;">{{ poll.question }}</h3>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <button 
                *ngFor="let option of poll.options" 
                mat-stroked-button 
                style="justify-content: space-between; padding: 12px 16px;"
                (click)="vote(poll, option)">
                <span>{{ option }}</span>
                <span style="color: #666; font-size: 12px;">{{ poll.votes[option] || 0 }} votes</span>
              </button>
            </div>
            <p style="color: #666; font-size: 14px; margin-bottom: 12px;">{{ poll.totalVotes }} total votes</p>
            <mat-divider style="margin: 12px 0;"></mat-divider>
            <div style="display: flex; gap: 12px;">
              <button mat-button size="small">
                <mat-icon style="margin-right: 4px;">thumb_up</mat-icon>Like
              </button>
              <button mat-button size="small">
                <mat-icon style="margin-right: 4px;">comment</mat-icon>Comment
              </button>
              <button mat-button size="small">
                <mat-icon style="margin-right: 4px;">share</mat-icon>Share
              </button>
            </div>
          </div>
        </mat-card>
      </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  
  events = [
    {
      title: 'AI in Education Webinar',
      description: 'Join us for an exciting discussion about the future of AI in educational technology and how it\'s transforming the learning experience.',
      date: '2 hours ago',
      time: '10:00 AM - 12:00 PM',
      type: 'webinar',
      isVirtual: true,
      location: 'Virtual Event'
    },
    {
      title: 'Programming Workshop',
      description: 'Hands-on workshop covering advanced JavaScript concepts and modern web development practices.',
      date: '5 hours ago',
      time: '2:00 PM - 5:00 PM',
      type: 'workshop',
      isVirtual: false,
      location: 'Room 101, CS Building'
    },
    {
      title: 'Career Guidance Seminar',
      description: 'Industry experts will share insights about career opportunities in technology and software development.',
      date: '1 day ago',
      time: '11:00 AM - 1:00 PM',
      type: 'seminar',
      isVirtual: true,
      location: 'Virtual Event'
    }
  ];

  polls = [
    {
      question: 'Which programming language would you like to learn next?',
      options: ['Python', 'Java', 'JavaScript', 'C++'],
      votes: { 'Python': 45, 'Java': 32, 'JavaScript': 28, 'C++': 15 },
      totalVotes: 120,
      date: '3 hours ago'
    },
    {
      question: 'What time works best for online lectures?',
      options: ['Morning (9-11 AM)', 'Afternoon (2-4 PM)', 'Evening (6-8 PM)'],
      votes: { 'Morning (9-11 AM)': 35, 'Afternoon (2-4 PM)': 42, 'Evening (6-8 PM)': 28 },
      totalVotes: 105,
      date: '6 hours ago'
    },
    {
      question: 'How satisfied are you with the current assessment system?',
      options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Needs Improvement'],
      votes: { 'Very Satisfied': 25, 'Satisfied': 48, 'Neutral': 22, 'Needs Improvement': 15 },
      totalVotes: 110,
      date: '1 day ago'
    }
  ];

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  vote(poll: any, option: string) {
    console.log('Voting for:', option, 'in poll:', poll.question);
    // In a real app, this would make an API call
    poll.votes[option] = (poll.votes[option] || 0) + 1;
    poll.totalVotes++;
  }
}