import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, SelectJobRoleDialogComponent } from '../select-job-role-dialog/select-job-role-dialog.component';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SelectJobRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }



  onNoClick(flag): void {
    this.dialogRef.close({ isCancel: flag });
  }

}

