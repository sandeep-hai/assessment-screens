import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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

  constructor() { }

  ngOnInit(): void { }
}