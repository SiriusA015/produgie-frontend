import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-delete-dialog',
  templateUrl: './event-delete-dialog.component.html',
  styleUrls: ['./event-delete-dialog.component.scss']
})
export class EventDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EventDeleteDialogComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(){
    this.dialogRef.close({delete: false});
  }
  onYesClick(){
    this.dialogRef.close({delete: true});
  }

}
