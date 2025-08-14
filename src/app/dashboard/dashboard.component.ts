import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

interface Poll {
  question: string;
  options: string[];
  votes: { [key: string]: number };
  totalVotes: number;
  date: string;
}

interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  isVirtual: boolean;
  location: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, MatDividerModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  
  events: Event[] = [
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

  polls: Poll[] = [
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

  vote(poll: Poll, option: string) {
    console.log('Voting for:', option, 'in poll:', poll.question);
    poll.votes[option] = (poll.votes[option] || 0) + 1;
    poll.totalVotes++;
  }
}