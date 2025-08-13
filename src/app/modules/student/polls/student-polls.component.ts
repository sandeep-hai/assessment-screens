import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Poll } from '../../../core/models/user.model';

@Component({
  selector: 'app-student-polls',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './student-polls.component.html',
  styleUrls: ['./student-polls.component.css']
})
export class StudentPollsComponent implements OnInit {
  polls$: Observable<Poll[]>;

  constructor(private mockDataService: MockDataService) {
    this.polls$ = this.mockDataService.polls$;
  }

  ngOnInit(): void {}

  vote(poll: Poll, option: string): void {
    console.log('Voting for:', option, 'in poll:', poll.question);
  }
}