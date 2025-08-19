import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemIcon, MatListItemTitle } from '@angular/material/list';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatChip } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { AuthService } from '../../../core/services/auth.service';
import { User, UserRole } from '../../../core/models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbar, MatIconButton, MatIcon, MatSidenavContainer, MatSidenav, MatSidenavContent, MatNavList, MatListItem, MatListItemIcon, MatListItemTitle, MatMenu, MatMenuTrigger, MatMenuItem, MatChip, MatDivider]
})
export class NavigationComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isMenuOpen = false;
  canGoBack = false;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.currentUser = user);

    // Track navigation to show/hide back button
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.canGoBack = window.history.length > 1;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    if (this.currentUser) {
      const homeRoute = this.getDashboardRoute();
      this.router.navigate([homeRoute]);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  switchUser(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getMenuItems() {
    if (!this.currentUser) return [];

    const baseItems = [
      { icon: 'dashboard', label: 'Dashboard', route: this.getDashboardRoute() }
    ];

    switch (this.currentUser.role) {
      case UserRole.STUDENT:
        return [
          ...baseItems,
          { icon: 'dynamic_feed', label: 'Feed', route: '/student/events' },
          { icon: 'quiz', label: 'Exams', route: '/student/exams' },
          { icon: 'assignment', label: 'Assignments', route: '/student/assignments' },
          { icon: 'poll', label: 'Polls', route: '/student/polls' },
          { icon: 'analytics', label: 'Analytics', route: '/student/analytics/exam' },
          { icon: 'article', label: 'Blogs', route: '/student/blogs' },
          { icon: 'groups', label: 'Community', route: '/student/community' },
          { icon: 'report', label: 'Complaints', route: '/student/complaints' }
        ];

      case UserRole.LECTURER:
        return [
          ...baseItems,
          { icon: 'create', label: 'Create Exam', route: '/lecturer/create-exam' },
          { icon: 'grading', label: 'Evaluate', route: '/lecturer/evaluate' },
          { icon: 'event', label: 'Events', route: '/lecturer/events' },
          { icon: 'article', label: 'Blogs', route: '/lecturer/blogs' }
        ];

      case UserRole.COLLEGE_ADMIN:
        return [
          ...baseItems,
          { icon: 'business', label: 'Manage College', route: '/college-admin/college' },
          { icon: 'person_add', label: 'Student Onboarding', route: '/college-admin/students' },
          { icon: 'group_add', label: 'Lecturer Onboarding', route: '/college-admin/lecturers' },
          { icon: 'subject', label: 'Subjects', route: '/college-admin/subjects' }
        ];

      case UserRole.APP_ADMIN:
        return [
          ...baseItems,
          { icon: 'subscriptions', label: 'Subscriptions', route: '/app-admin/subscriptions' },
          { icon: 'book', label: 'Subjects & Syllabus', route: '/app-admin/subjects' },
          { icon: 'smart_toy', label: 'AI Models', route: '/app-admin/ai-models' },
          { icon: 'analytics', label: 'Statistics', route: '/app-admin/statistics' }
        ];

      default:
        return baseItems;
    }
  }

  private getDashboardRoute(): string {
    if (!this.currentUser) return '/';
    
    switch (this.currentUser.role) {
      case UserRole.STUDENT: return '/student/dashboard';
      case UserRole.LECTURER: return '/lecturer/dashboard';
      case UserRole.COLLEGE_ADMIN: return '/college-admin/dashboard';
      case UserRole.APP_ADMIN: return '/app-admin/dashboard';
      default: return '/';
    }
  }

  getRoleDisplayName(): string {
    if (!this.currentUser) return '';
    
    switch (this.currentUser.role) {
      case UserRole.STUDENT: return 'Student';
      case UserRole.LECTURER: return 'Lecturer';
      case UserRole.COLLEGE_ADMIN: return 'College Admin';
      case UserRole.APP_ADMIN: return 'App Admin';
      default: return '';
    }
  }
}