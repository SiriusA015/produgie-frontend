import { AddEventCalendarDialogComponent } from './../add-event-calendar-dialog/add-event-calendar-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { EventDeleteDialogComponent } from '../event-delete-dialog/event-delete-dialog.component';

@Component({
  selector: 'app-view-event-calendar-dialog',
  templateUrl: './view-event-calendar-dialog.component.html',
  styleUrls: ['./view-event-calendar-dialog.component.scss'],
})
export class ViewEventCalendarDialogComponent implements OnInit {
  loadCounter = 0;
  eventData: any;
  meetingTimeFrom: string;
  meetingTimeTo: string;
  activityCrew: any;
  stakeholder: any;
  today = Date.now();
  date: any;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewEventCalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data', data)
  }

  ngOnInit(): void {
    this.meetingTimeFrom = moment(
      this.data.event.eventDetails.meetingTimeFrom
    ).format('hh:mm A');
    this.meetingTimeTo = moment(
      this.data.event.eventDetails.meetingTimeTo
    ).format('hh:mm A');
    this.getCrewStakeholder();
  }
  onNoClick(): void {
    this.dialogRef.close({isCancel: true});
  }
  getCrewStakeholder() {
    this.loadCounter += 1;
    this.http
      .get(
        `${environment.baseurl}/actionactivity/crew-stakeholder/` +
          this.data.event.eventDetails.id
      )
      .subscribe(
        (res: any) => {
          console.log(res.data);
          this.activityCrew = res.data.supportCrew;
          this.stakeholder = res.data.stakeHolder;
          this.loadCounter -= 1;
        },
        (err) => console.log(err)
      );
  }
  editEvent(): void {
    const dialogRef = this.dialog.open(AddEventCalendarDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      data: { isEdit: true, data: this.data },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.dialogRef.close({ isCancel: false, data: null });
      }
    });
  }
  deleteEvent(){
    const dialogRef = this.dialog.open(EventDeleteDialogComponent, {
      width: '90%',
      maxWidth: '90%',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.delete){
        this.http.delete(`${environment.baseurl}/actionactivity/delete/` + this.data.event.eventDetails.id).subscribe(
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
