import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cronofy-alert',
  templateUrl: './cronofy-alert.component.html',
  styleUrls: ['./cronofy-alert.component.scss']
})
export class CronofyAlertComponent implements OnInit {
  redirectUrl:string;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData,
              public matdialogRef: MatDialogRef<CronofyAlertComponent>) {
              this.redirectUrl = dialogData.redirectUrl;
               }

  ngOnInit(): void {
  }

  closeCronifyModel(isReadyToAuthenticate) {    
    this.matdialogRef.close({
      isReadyToAuthenticate: isReadyToAuthenticate
    });    
  }

  onAuthorization() {
    window.location.href = this.redirectUrl;    
  }
}
