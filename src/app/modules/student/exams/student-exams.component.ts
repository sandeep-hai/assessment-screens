import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Exam } from '../../../core/models/user.model';

@Component({
  selector: 'app-student-exams',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './student-exams.component.html',
  styleUrls: ['./student-exams.component.css']
})
export class StudentExamsComponent implements OnInit {
  exams$: Observable<Exam[]>;

  constructor(private mockDataService: MockDataService) {
    this.exams$ = this.mockDataService.exams$;
  }

  ngOnInit(): void {}

  takeExam(examId: string): void {
    console.log('Taking exam:', examId);
  }
}