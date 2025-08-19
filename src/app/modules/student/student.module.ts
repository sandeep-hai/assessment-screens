import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

// Material imports
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Components
import { TakeExamComponent } from './exams/take-exam/take-exam.component';
import { ViewExamComponent } from './exams/view-exam/view-exam.component';
import { ExamAnalyticsComponent } from './analytics/exam-analytics/exam-analytics.component';
import { AcademicSkillAnalyticsComponent } from './analytics/academic-skill-analytics/academic-skill-analytics.component';
import { NonAcademicSkillAnalyticsComponent } from './analytics/non-academic-skill-analytics/non-academic-skill-analytics.component';
import { StudentEventsComponent } from './events/student-events.component';
import { StudentBlogsComponent } from './blogs/student-blogs.component';
import { CommunityComponent } from './community/community.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { StudentPollsComponent } from './polls/student-polls.component';
import { StudentDashboardComponent } from './dashboard/student-dashboard.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    
    // Material Modules
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatOptionModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatStepperModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatSlideToggleModule,
    
    // Components
    TakeExamComponent,
    ViewExamComponent,
    ExamAnalyticsComponent,
    AcademicSkillAnalyticsComponent,
    NonAcademicSkillAnalyticsComponent,
    StudentEventsComponent,
    StudentBlogsComponent,
    CommunityComponent,
    AssignmentsComponent,
    ComplaintsComponent,
    StudentPollsComponent,
    StudentDashboardComponent,
    
    RouterModule.forChild([
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'events', component: StudentEventsComponent },
      { path: 'exams/take', component: TakeExamComponent },
      { path: 'exams/take/:id', component: TakeExamComponent },
      { path: 'exams/view', component: ViewExamComponent },
      { path: 'analytics/exam', component: ExamAnalyticsComponent },
      { path: 'analytics/skills/academic', component: AcademicSkillAnalyticsComponent },
      { path: 'analytics/skills/non-academic', component: NonAcademicSkillAnalyticsComponent },
      { path: 'blogs', component: StudentBlogsComponent },
      { path: 'community', component: CommunityComponent },
      { path: 'assignments', component: AssignmentsComponent },
      { path: 'complaints', component: ComplaintsComponent },
      { path: 'polls', component: StudentPollsComponent },
      { path: '', redirectTo: 'events', pathMatch: 'full' }
    ])
  ]
})
export class StudentModule { }