import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? `${user.firstName} ${user.lastName}` : 'App Admin';
  }

  logout(): void {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Navigation methods
  navigateToColleges(): void {
    console.log('Navigating to colleges management...');
    alert('Colleges management feature coming soon!');
  }

  navigateToSubscriptions(): void {
    console.log('Navigating to subscriptions...');
    alert('Subscriptions management feature coming soon!');
  }

  navigateToAIModels(): void {
    console.log('Navigating to AI models...');
    alert('AI models management feature coming soon!');
  }

  navigateToGlobalSubjects(): void {
    console.log('Navigating to global subjects...');
    alert('Global subjects management feature coming soon!');
  }

  navigateToAnalytics(): void {
    console.log('Navigating to analytics...');
    alert('Analytics feature coming soon!');
  }

  navigateToContentLibrary(): void {
    console.log('Navigating to content library...');
    alert('Content library feature coming soon!');
  }

  navigateToSystemConfig(): void {
    console.log('Navigating to system config...');
    alert('System configuration feature coming soon!');
  }

  navigateToSupport(): void {
    console.log('Navigating to support center...');
    alert('Support center feature coming soon!');
  }
}