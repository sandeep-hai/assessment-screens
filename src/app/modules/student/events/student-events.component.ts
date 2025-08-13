import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Event } from '../../../core/models/user.model';
import { CreateEventDialogComponent } from './create-event-dialog/create-event-dialog.component';

@Component({
  selector: 'app-student-events',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule
  ],
  templateUrl: './student-events.component.html',
  styleUrls: ['./student-events.component.css']
})
export class StudentEventsComponent implements OnInit {
  events$: Observable<Event[]>;
  selectedTab = 0;

  constructor(
    private mockDataService: MockDataService,
    private dialog: MatDialog
  ) {
    this.events$ = this.mockDataService.events$;
  }

  ngOnInit(): void {}

  openCreateEventDialog(): void {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '600px',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mockDataService.createEvent(result).subscribe();
      }
    });
  }

  joinEvent(event: Event): void {
    // Mock join event logic
    console.log('Joining event:', event.title);
  }

  getEventTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      'webinar': 'primary',
      'workshop': 'accent',
      'seminar': 'warn',
      'conference': 'primary',
      'exam': 'warn',
      'assignment': 'accent'
    };
    return colors[type] || 'primary';
  }
}