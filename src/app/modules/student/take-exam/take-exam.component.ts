import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {
  examId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['id'];
  }

  submitExam(): void {
    console.log('Submitting exam:', this.examId);
    this.router.navigate(['/student/exams']);
  }
}