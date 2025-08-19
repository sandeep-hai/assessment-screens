import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';

interface Question {
  id: string;
  type: 'mcq' | 'text' | 'voice' | 'video' | 'programming' | 'panel';
  question: string;
  options?: string[];
  timeLimit?: number;
  marks: number;
}

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatStepperModule,
    MatToolbarModule,
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {
  examId: string = '';
  currentQuestionIndex = 0;
  timeRemaining = 3600; // 60 minutes in seconds
  isProctoring = true;
  examForm: FormGroup;
  
  mockExam = {
    id: 'exam1',
    title: 'Computer Science Fundamentals',
    duration: 60,
    totalMarks: 100,
    questions: [
      {
        id: 'q1',
        type: 'mcq' as const,
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        marks: 10
      },
      {
        id: 'q2',
        type: 'text' as const,
        question: 'Explain the concept of polymorphism in object-oriented programming.',
        marks: 15
      },
      {
        id: 'q3',
        type: 'programming' as const,
        question: 'Write a function to reverse a linked list.',
        marks: 25
      }
    ] as Question[]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.examForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['id'] || 'default';
    this.initializeForm();
    this.startTimer();
    this.initializeProctoring();
  }

  private initializeForm(): void {
    const formControls: any = {};
    this.mockExam.questions.forEach(q => {
      formControls[q.id] = [''];
    });
    this.examForm = this.fb.group(formControls);
  }

  private startTimer(): void {
    const timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        clearInterval(timer);
        this.submitExam();
      }
    }, 1000);
  }

  private initializeProctoring(): void {
    // Mock AI proctoring initialization
    console.log('AI Proctoring initialized');
  }

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? `${user.firstName} ${user.lastName}` : 'Student';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getTimeFormatted(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  getProgress(): number {
    return ((this.currentQuestionIndex + 1) / this.mockExam.questions.length) * 100;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.mockExam.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  submitExam(): void {
    console.log('Submitting exam:', this.examForm.value);
    alert('Exam submitted successfully!');
    this.router.navigate(['/student/exams/view']);
  }

  getCurrentQuestion(): Question {
    return this.mockExam.questions[this.currentQuestionIndex];
  }

  isAnswered(questionId: string): boolean {
    const answer = this.examForm.get(questionId)?.value;
    return answer && answer.trim() !== '';
  }
}