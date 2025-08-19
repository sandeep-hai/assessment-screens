import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, CommonModule],
  template: `
    <div class="app-container">
      <app-navigation *ngIf="showNavigation">
        <router-outlet></router-outlet>
      </app-navigation>
      
      <router-outlet *ngIf="!showNavigation"></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      overflow: hidden;
    }
  `]
})
export class AppComponent {
  title = 'Assessment Tool';

  constructor(private authService: AuthService) {}

  get showNavigation(): boolean {
    const user = this.authService.getCurrentUser();
    return !!user;
  }
}