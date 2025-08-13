import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
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
          { icon: 'event', label: 'Events', route: '/student/events' },
          { icon: 'quiz', label: 'Exams', route: '/student/exams' },
          { icon: 'assignment', label: 'Assignments', route: '/student/assignments' },
          { icon: 'poll', label: 'Polls', route: '/student/polls' }
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