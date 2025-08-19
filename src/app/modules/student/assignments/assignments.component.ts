import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: Date;
  maxMarks: number;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  submittedAt?: Date;
  grade?: number;
  feedback?: string;
  allowResubmission: boolean;
  maxFileSize: number; // in MB
  allowedFileTypes: string[];
  submittedFiles?: File[];
}

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  selectedTab = 0;
  selectedFiles: File[] = [];
  Math = Math;

  assignments: Assignment[] = [
    {
      id: '1',
      title: 'Data Structures Implementation',
      description: 'Implement a binary search tree with insertion, deletion, and traversal methods.',
      subject: 'Computer Science',
      dueDate: new Date('2024-02-15'),
      maxMarks: 100,
      status: 'pending',
      allowResubmission: true,
      maxFileSize: 10,
      allowedFileTypes: ['.java', '.cpp', '.py', '.js']
    },
    {
      id: '2',
      title: 'Algorithm Analysis Report',
      description: 'Write a comprehensive report analyzing the time and space complexity of sorting algorithms.',
      subject: 'Computer Science',
      dueDate: new Date('2024-02-10'),
      maxMarks: 50,
      status: 'submitted',
      submittedAt: new Date('2024-02-08'),
      allowResubmission: false,
      maxFileSize: 5,
      allowedFileTypes: ['.pdf', '.doc', '.docx']
    },
    {
      id: '3',
      title: 'Database Design Project',
      description: 'Design and implement a database schema for an e-commerce application.',
      subject: 'Database Systems',
      dueDate: new Date('2024-01-30'),
      maxMarks: 75,
      status: 'graded',
      submittedAt: new Date('2024-01-28'),
      grade: 68,
      feedback: 'Good work on the schema design. Consider adding more indexes for better performance.',
      allowResubmission: false,
      maxFileSize: 10,
      allowedFileTypes: ['.sql', '.pdf', '.zip']
    }
  ];

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

  getFilteredAssignments(): Assignment[] {
    switch (this.selectedTab) {
      case 0: return this.assignments.filter(a => a.status === 'pending');
      case 1: return this.assignments.filter(a => a.status === 'submitted');
      case 2: return this.assignments.filter(a => a.status === 'graded');
      default: return this.assignments;
    }
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'pending': '#ff9800',
      'submitted': '#2196f3',
      'graded': '#4caf50',
      'overdue': '#f44336'
    };
    return colors[status] || '#666';
  }

  getDaysRemaining(dueDate: Date): number {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isOverdue(assignment: Assignment): boolean {
    return this.getDaysRemaining(assignment.dueDate) < 0 && assignment.status === 'pending';
  }

  onFileSelected(event: any, assignment: Assignment): void {
    const files = Array.from(event.target.files) as File[];
    
    // Validate file types
    const invalidFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      return !assignment.allowedFileTypes.includes(extension);
    });

    if (invalidFiles.length > 0) {
      alert(`Invalid file types. Allowed types: ${assignment.allowedFileTypes.join(', ')}`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = files.filter(file => file.size > assignment.maxFileSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`Some files exceed the maximum size limit of ${assignment.maxFileSize}MB`);
      return;
    }

    this.selectedFiles = files;
  }

  submitAssignment(assignment: Assignment): void {
    if (this.selectedFiles.length === 0) {
      alert('Please select files to submit');
      return;
    }

    // Mock submission
    assignment.status = 'submitted';
    assignment.submittedAt = new Date();
    assignment.submittedFiles = [...this.selectedFiles];
    
    console.log('Submitting assignment:', assignment.title);
    console.log('Files:', this.selectedFiles);
    
    alert('Assignment submitted successfully!');
    this.selectedFiles = [];
  }

  resubmitAssignment(assignment: Assignment): void {
    if (!assignment.allowResubmission) {
      alert('Resubmission is not allowed for this assignment');
      return;
    }

    assignment.status = 'pending';
    assignment.submittedAt = undefined;
    assignment.grade = undefined;
    assignment.feedback = undefined;
    
    console.log('Assignment reset for resubmission:', assignment.title);
    alert('Assignment reset. You can now resubmit.');
  }

  requestExtension(assignment: Assignment): void {
    console.log('Requesting extension for:', assignment.title);
    alert('Extension request submitted. You will be notified of the decision.');
  }

  downloadSubmission(assignment: Assignment): void {
    console.log('Downloading submission for:', assignment.title);
    alert('Download feature coming soon!');
  }

  viewFeedback(assignment: Assignment): void {
    if (assignment.feedback) {
      alert(`Feedback: ${assignment.feedback}`);
    } else {
      alert('No feedback available yet.');
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}