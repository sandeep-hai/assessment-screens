import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-college-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './college-admin-dashboard.component.html',
  styleUrls: ['./college-admin-dashboard.component.css']
})
export class CollegeAdminDashboardComponent implements OnInit {
  dashboardStats = {
    totalStudents: 1250,
    totalLecturers: 85,
    activeSubjects: 45,
    pendingApprovals: 12
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? `${user.firstName} ${user.lastName}` : 'College Admin';
  }

  logout(): void {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Navigation methods
  navigateToStudents(): void {
    console.log('Navigating to students management...');
    alert('Students management feature coming soon!');
  }

  navigateToLecturers(): void {
    console.log('Navigating to lecturers management...');
    alert('Lecturers management feature coming soon!');
  }

  navigateToSubjects(): void {
    console.log('Navigating to subjects management...');
    alert('Subjects management feature coming soon!');
  }

  navigateToApprovals(): void {
    console.log('Navigating to pending approvals...');
    alert('Approvals management feature coming soon!');
  }

  manageCollege(): void {
    console.log('Managing college settings...');
    alert('College management feature coming soon!');
  }

  viewReports(): void {
    console.log('Viewing reports...');
    alert('Reports feature coming soon!');
  }

  systemSettings(): void {
    console.log('Opening system settings...');
    alert('System settings feature coming soon!');
  }
}