import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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

import { StudentEventsComponent } from './events/student-events.component';
import { StudentExamsComponent } from './exams/student-exams.component';
import { TakeExamComponent } from './take-exam/take-exam.component';
import { StudentPollsComponent } from './polls/student-polls.component';
import { CreateEventDialogComponent } from './events/create-event-dialog/create-event-dialog.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CreateEventDialogComponent,
    TakeExamComponent,
    StudentEventsComponent,
    StudentExamsComponent,
    StudentPollsComponent,
    RouterModule.forChild([
      { path: 'events', component: StudentEventsComponent },
      { path: 'exams', component: StudentExamsComponent },
      { path: 'assignments', component: StudentExamsComponent },
      { path: 'polls', component: StudentPollsComponent },
      { path: 'take-exam/:id', component: TakeExamComponent },
      { path: '', redirectTo: 'events', pathMatch: 'full' }
    ]),
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule,
    MatOptionModule,
  ]
})
export class StudentModule { }