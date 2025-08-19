import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../../../core/services/auth.service';

interface ExamResult {
  id: string;
  examTitle: string;
  subject: string;
  date: Date;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  status: 'completed' | 'pending' | 'missed';
  questions: QuestionResult[];
}

interface QuestionResult {
  id: string;
  question: string;
  type: string;
  marks: number;
  obtainedMarks: number;
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
}

@Component({
  selector: 'app-view-exam',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatTableModule,
    MatProgressBarModule
  ],
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.css']
})
export class ViewExamComponent implements OnInit {
  examResults: ExamResult[] = [
    {
      id: '1',
      examTitle: 'Computer Science Fundamentals',
      subject: 'Computer Science',
      date: new Date('2024-01-15'),
      totalMarks: 100,
      obtainedMarks: 85,
      percentage: 85,
      grade: 'A',
      status: 'completed',
      questions: [
        {
          id: 'q1',
          question: 'What is the time complexity of binary search?',
          type: 'MCQ',
          marks: 10,
          obtainedMarks: 10,
          isCorrect: true,
          userAnswer: 'O(log n)',
          correctAnswer: 'O(log n)'
        },
        {
          id: 'q2',
          question: 'Explain polymorphism in OOP.',
          type: 'Text',
          marks: 15,
          obtainedMarks: 12,
          isCorrect: false,
          userAnswer: 'Polymorphism allows objects to take multiple forms...',
          correctAnswer: 'Detailed explanation of polymorphism...'
        }
      ]
    },
    {
      id: '2',
      examTitle: 'Data Structures Quiz',
      subject: 'Computer Science',
      date: new Date('2024-01-10'),
      totalMarks: 50,
      obtainedMarks: 42,
      percentage: 84,
      grade: 'A',
      status: 'completed',
      questions: []
    }
  ];

  selectedExam: ExamResult | null = null;
  displayedColumns: string[] = ['question', 'type', 'marks', 'obtained', 'status'];

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

  viewExamDetails(exam: ExamResult): void {
    this.selectedExam = exam;
  }

  getGradeColor(grade: string): string {
    const colors: { [key: string]: string } = {
      'A+': '#4caf50',
      'A': '#4caf50',
      'B+': '#8bc34a',
      'B': '#8bc34a',
      'C+': '#ffc107',
      'C': '#ffc107',
      'D': '#ff9800',
      'F': '#f44336'
    };
    return colors[grade] || '#666';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'completed': '#4caf50',
      'pending': '#ff9800',
      'missed': '#f44336'
    };
    return colors[status] || '#666';
  }

  retakeExam(examId: string): void {
    this.router.navigate(['/student/exams/take', examId]);
  }

  goBack(): void {
    this.selectedExam = null;
  }

  getCorrectAnswersCount(): number {
    return this.selectedExam ? this.selectedExam.questions.filter(q => q.isCorrect).length : 0;
  }
}