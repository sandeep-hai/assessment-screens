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
    // Watch for route changes to determine if navigation should be shown
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavigation = this.shouldShowNavigation(event.url);
      });

    // Check initial route
    this.showNavigation = this.shouldShowNavigation(this.router.url);
  }

  private shouldShowNavigation(url: string): boolean {
    const authRoutes = ['/auth', '/unauthorized'];
    const isAuthRoute = authRoutes.some(route => url.startsWith(route));
    const isAuthenticated = this.authService.isAuthenticated();

    return !isAuthRoute && isAuthenticated;
  }
}
