import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { NavigationComponent } from './shared/components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent]
})
export class AppComponent implements OnInit {
  title = 'Assessment Tool';
  showNavigation = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check authentication status and redirect accordingly
    this.checkAuthenticationAndRedirect();
    
    // Watch for route changes to determine if navigation should be shown
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavigation = this.shouldShowNavigation(event.url);
      });

    // Check initial route
    this.showNavigation = this.shouldShowNavigation(this.router.url);
  }

  private checkAuthenticationAndRedirect(): void {
    const currentUrl = this.router.url;
    const isAuthenticated = this.authService.isAuthenticated();
    
    // If user is authenticated and on auth pages, redirect to dashboard
    if (isAuthenticated && (currentUrl === '/' || currentUrl.startsWith('/auth'))) {
      this.redirectToDashboard();
    }
    // If user is not authenticated and not on auth pages, redirect to login
    else if (!isAuthenticated && !currentUrl.startsWith('/auth') && currentUrl !== '/unauthorized') {
      this.router.navigate(['/auth/login']);
    }
  }

  private redirectToDashboard(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      switch (user.role) {
        case 'student':
          this.router.navigate(['/student/dashboard']);
          break;
        case 'lecturer':
          this.router.navigate(['/lecturer/dashboard']);
          break;
        case 'college_admin':
          this.router.navigate(['/college-admin/dashboard']);
          break;
        case 'app_admin':
          this.router.navigate(['/app-admin/dashboard']);
          break;
        default:
          this.router.navigate(['/auth/login']);
      }
    }
  }
  private shouldShowNavigation(url: string): boolean {
    const authRoutes = ['/auth', '/unauthorized'];
    const isAuthRoute = authRoutes.some(route => url.startsWith(route));
    const isAuthenticated = this.authService.isAuthenticated();

    return !isAuthRoute && isAuthenticated;
  }
}
