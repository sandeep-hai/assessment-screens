import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../../../core/services/auth.service';

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  submittedAt: Date;
  updatedAt: Date;
  response?: string;
  assignedTo?: string;
}

enum ComplaintCategory {
  ACADEMIC = 'Academic',
  NON_ACADEMIC = 'Non-Academic',
  LECTURER = 'Lecturer',
  STUDENT = 'Student',
  TECHNICAL = 'Technical',
  GENERIC = 'Generic'
}

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatTabsModule,
    MatExpansionModule
  ],
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  complaintForm: FormGroup;
  selectedTab = 0;
  
  complaintCategories = Object.values(ComplaintCategory);
  priorities = ['low', 'medium', 'high', 'urgent'];

  complaints: Complaint[] = [
    {
      id: '1',
      title: 'Issues with Online Exam Platform',
      description: 'The exam platform keeps crashing during tests, causing loss of progress.',
      category: ComplaintCategory.TECHNICAL,
      priority: 'high',
      status: 'in-progress',
      submittedAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-16'),
      response: 'We are investigating the technical issues and will provide an update soon.',
      assignedTo: 'Technical Support Team'
    },
    {
      id: '2',
      title: 'Unfair Grading in Mathematics Course',
      description: 'The grading criteria seems inconsistent across different sections of the same course.',
      category: ComplaintCategory.ACADEMIC,
      priority: 'medium',
      status: 'resolved',
      submittedAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-14'),
      response: 'After review, we have standardized the grading criteria and re-evaluated affected submissions.',
      assignedTo: 'Academic Affairs'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.complaintForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', Validators.required],
      priority: ['medium', Validators.required]
    });
  }

  ngOnInit(): void {}

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? `${user.firstName} ${user.lastName}` : 'Student';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getFilteredComplaints(): Complaint[] {
    switch (this.selectedTab) {
      case 0: return this.complaints.filter(c => c.status === 'open' || c.status === 'in-progress');
      case 1: return this.complaints.filter(c => c.status === 'resolved' || c.status === 'closed');
      default: return this.complaints;
    }
  }

  onSubmit(): void {
    if (this.complaintForm.valid) {
      const formValue = this.complaintForm.value;
      const newComplaint: Complaint = {
        id: Date.now().toString(),
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        priority: formValue.priority,
        status: 'open',
        submittedAt: new Date(),
        updatedAt: new Date()
      };

      this.complaints.unshift(newComplaint);
      this.complaintForm.reset();
      this.complaintForm.patchValue({ priority: 'medium' });
      
      console.log('New complaint submitted:', newComplaint);
      alert('Complaint submitted successfully! You will receive updates on its progress.');
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.complaintForm.controls).forEach(key => {
        this.complaintForm.get(key)?.markAsTouched();
      });
    }
  }

  getCategoryColor(category: ComplaintCategory): string {
    const colors: { [key: string]: string } = {
      'Academic': '#2196f3',
      'Non-Academic': '#4caf50',
      'Lecturer': '#ff9800',
      'Student': '#9c27b0',
      'Technical': '#f44336',
      'Generic': '#607d8b'
    };
    return colors[category] || '#666';
  }

  getPriorityColor(priority: string): string {
    const colors: { [key: string]: string } = {
      'low': '#4caf50',
      'medium': '#ff9800',
      'high': '#f44336',
      'urgent': '#9c27b0'
    };
    return colors[priority] || '#666';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'open': '#ff9800',
      'in-progress': '#2196f3',
      'resolved': '#4caf50',
      'closed': '#607d8b'
    };
    return colors[status] || '#666';
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'open': 'new_releases',
      'in-progress': 'hourglass_empty',
      'resolved': 'check_circle',
      'closed': 'lock'
    };
    return icons[status] || 'help';
  }

  viewComplaintDetails(complaint: Complaint): void {
    console.log('Viewing complaint details:', complaint);
    // In a real app, this would open a detailed view or modal
    alert(`Complaint: ${complaint.title}\n\nStatus: ${complaint.status}\nAssigned to: ${complaint.assignedTo || 'Not assigned'}`);
  }

  withdrawComplaint(complaint: Complaint): void {
    if (complaint.status === 'open') {
      if (confirm('Are you sure you want to withdraw this complaint?')) {
        complaint.status = 'closed';
        complaint.updatedAt = new Date();
        console.log('Complaint withdrawn:', complaint.title);
        alert('Complaint has been withdrawn.');
      }
    } else {
      alert('Only open complaints can be withdrawn.');
    }
  }
}