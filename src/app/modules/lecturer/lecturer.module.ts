import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LecturerDashboardComponent } from './dashboard/lecturer-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LecturerDashboardComponent,
    RouterModule.forChild([
      { path: 'dashboard', component: LecturerDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ])
  ]
})
export class LecturerModule { }