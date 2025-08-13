import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { EventType } from '../../../../core/models/user.model';

@Component({
  selector: 'app-create-event-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.css']
})
export class CreateEventDialogComponent implements OnInit {
  eventForm: FormGroup;
  eventTypes = Object.values(EventType);

  get isVirtual(): boolean {
    return this.eventForm.get('isVirtual')?.value || false;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEventDialogComponent>,
    private authService: AuthService
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      isVirtual: [false],
      location: [''],
      virtualLink: [''],
      maxAttendees: [null, [Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Watch for virtual event changes
    this.eventForm.get('isVirtual')?.valueChanges.subscribe(isVirtual => {
      const locationControl = this.eventForm.get('location');
      const virtualLinkControl = this.eventForm.get('virtualLink');
      
      if (isVirtual) {
        locationControl?.clearValidators();
        virtualLinkControl?.setValidators([Validators.required, Validators.pattern(/^https?:\/\/.+/)]);
      } else {
        locationControl?.setValidators([Validators.required]);
        virtualLinkControl?.clearValidators();
      }
      
      locationControl?.updateValueAndValidity();
      virtualLinkControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      const formValue = this.eventForm.value;
      
      const eventData = {
        ...formValue,
        createdBy: currentUser?.id || '',
        attendees: [],
        isActive: true
      };
      
      this.dialogRef.close(eventData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}