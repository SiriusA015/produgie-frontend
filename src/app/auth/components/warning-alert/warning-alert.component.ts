import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.scss']
})
export class WarningAlertComponent implements OnInit {

  message:string;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData,
  public matdialogRef: MatDialogRef<WarningAlertComponent>) { }

  ngOnInit(): void {
    this.message = this.dialogData.message;
  }

  closeModel() {    
    this.matdialogRef.close({
      isClosed: true
    });    
  }
}
