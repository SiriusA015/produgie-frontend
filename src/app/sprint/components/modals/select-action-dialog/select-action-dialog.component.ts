import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-action-dialog',
  templateUrl: './select-action-dialog.component.html',
  styleUrls: ['./select-action-dialog.component.scss']
})
export class SelectActionDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SelectActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  onClose(): void {
    this.dialogRef.close({isCancel: true});
  }
  selectAction(action){
    this.dialogRef.close({isCancel: false, selected: action});
  }
}
