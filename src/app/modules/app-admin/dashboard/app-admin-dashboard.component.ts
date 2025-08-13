import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app-admin-dashboard.component.html',
  styleUrls: ['./app-admin-dashboard.component.css']
})
export class AppAdminDashboardComponent implements OnInit {
  dashboardStats = {
    totalColleges: 25,
    totalSubscriptions: 23,
    activeAIModels: 5,
    systemHealth: '99.8%'
  };

  constructor() { }

  ngOnInit(): void { }
}