import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { WcReviewDialogComponent } from '../wc-review-dialog/wc-review-dialog.component';

@Component({
  selector: 'app-wc-notification-dialog',
  templateUrl: './wc-notification-dialog.component.html',
  styleUrls: ['./wc-notification-dialog.component.scss'],
})
export class WcNotificationDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<WcNotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onClose(){
    this.dialogRef.close({data: 0});
  }
  openForm(){
    this.dialogRef.close();
    this.openwcNotificationDialog();
  }
  openwcNotificationDialog(){
    const dialogRef = this.dialog.open(WcReviewDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      panelClass: 'custom-dialog-container',
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(result);
    // });
  }
}
