import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-activity-dialog',
  templateUrl: './select-activity-dialog.component.html',
  styleUrls: ['./select-activity-dialog.component.scss'],
})
export class SelectActivityDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SelectActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  onClose(): void {
    this.dialogRef.close({isCancel: true});
  }
  selectActivity(activity){
    this.dialogRef.close({isCancel: false, selected: activity});
  }
}
