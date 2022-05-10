import { EventDeleteDialogComponent } from './../event-delete-dialog/event-delete-dialog.component';
import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AddEventDialogComponent } from './../add-event-dialog/add-event-dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
@Component({
  selector: 'app-view-event-dialog',
  templateUrl: './view-event-dialog.component.html',
  styleUrls: ['./view-event-dialog.component.scss']
})
export class ViewEventDialogComponent implements OnInit {
  loadCounter = 0;
  date = moment().add(this.data.day, 'd').toISOString();
  meetingTimeFrom = moment(new Date()).toISOString();
  meetingTimeTo = moment(new Date()).toISOString();
  activityCrew = [];
  stakeholder = [];
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close({isCancel: true});
  }
  ngOnInit(): void {
    this.meetingTimeFrom = moment(this.data?.event?.details?.meetingTimeFrom).format('hh:mm A');
    this.meetingTimeTo = moment(this.data?.event?.details?.meetingTimeTo).format('hh:mm A');
    this.getCrewStakeholder();
  }
  getCrewStakeholder(){
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/actionactivity/crew-stakeholder/` + this.data.event.details.id).subscribe(
      (res: any) => {
        this.activityCrew = res.data.supportCrew;
        this.stakeholder = res.data.stakeHolder;
        this.loadCounter -= 1;
      },
      err => console.log(err)
    );
  }
  editEvent(): void {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      data: {isEdit: true, data: this.data},
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel){
        this.dialogRef.close({isCancel: false, data: null});
      }
    });
  }
  deleteEvent(){
    const dialogRef = this.dialog.open(EventDeleteDialogComponent, {
      width: '90%',
      maxWidth: '90%',
      // panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.delete){
        this.http.delete(`${environment.baseurl}/actionactivity/delete/` + this.data.event.details.id).subscribe(
          (res: any) => {
            console.log(res.data);
            this.dialogRef.close({isCancel: false, data: null});
          },
          err => console.log(err)
        );
      }
    });
  }
}
