import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css'],
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
  ],
})
export class AddTaskModalComponent {
  title: string = '';
  description: string = '';
  showError: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddTaskModalComponent>) {}

  onAdd() {
    this.dialogRef.close({
      title: this.title,
      description: this.description,
      status: 0,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  checkInputs() {
    this.showError = !this.title || !this.description;
  }
}
