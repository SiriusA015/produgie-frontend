import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';
import { AddEventCalendarDialogComponent } from '../add-event-calendar-dialog/add-event-calendar-dialog.component';
import { ViewEventCalendarDialogComponent } from '../view-event-calendar-dialog/view-event-calendar-dialog.component';

@Component({
  selector: 'app-add-event-bottom-dialog',
  templateUrl: './add-event-bottom-dialog.component.html',
  styleUrls: ['./add-event-bottom-dialog.component.scss'],
})
export class AddEventBottomDialogComponent implements OnInit {
  events = [];
  icons = {
    WC: 'dashboard',
    FF: 'timer',
    ACS: 'person',
    ESC: 'group',
    SDL: 'check_circle',
    FSL: 'videocam',
    OTH: 'gamepad',
  };
  colors = {
    WC: 'bg-yellow-600',
    FF: 'bg-orange-600',
    ACS: 'pg-bg-acs',
    ESC: 'pg-bg-esc',
    SDL: 'pg-bg-sdl',
    FSL: 'pg-bg-fsl',
    OTH: 'pg-bg-oth',
  };
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddEventBottomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    public configService: ConfigService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  openAddDialog() {
    const day = this.data.selectedDate;
    const dialogRef = this.dialog.open(AddEventCalendarDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      data: { isEdit: false, day },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.dialogRef.close({isCancel: false});
        // this.getAllEvents();
      }
    });
  }
  openViewDialog(event) {
    const day = this.data.selectedDate;
    const dialogRef = this.dialog.open(ViewEventCalendarDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      data: { day, event, isStop: this.data.isStop },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.dialogRef.close({isCancel: false});
      }
    });
  }
  // getAllEvents() {
  //   this.events = [];
  //   this.http
  //     .get(`${environment.baseurl}/actionactivity/get-by-date`)
  //     .subscribe(
  //       (res: any) => {
  //         const WCeve = [];
  //         const FFeve = [];
  //         const CLEANeve = [];
  //         res.data.map((o) => {
  //           const cleaneve = o.activity.filter(
  //             (obj) =>
  //               obj.activityType.code !== 'WC' && obj.activityType.code !== 'FF'
  //           );
  //           if (cleaneve.length > 0) {
  //             cleaneve.map((e) =>
  //               CLEANeve.push({ date: o.date, activity: [e] })
  //             );
  //           }
  //           const wceve = o.activity.filter(
  //             (obj) => obj.activityType.code === 'WC'
  //           );
  //           if (wceve.length > 0) {
  //             WCeve.push({ date: o.date, activity: [wceve[0]] });
  //           }
  //           const ffeve = o.activity.filter(
  //             (obj) => obj.activityType.code === 'FF'
  //           );
  //           if (ffeve.length > 0) {
  //             FFeve.push({ date: o.date, activity: [ffeve[0]] });
  //           }
  //         });
  //         const allCleanEvents = [...WCeve, ...FFeve, ...CLEANeve];
  //         const eventData = allCleanEvents.map((o) => {
  //           const ev = o.activity.map((obj) => {
  //             // tslint:disable-next-line:max-line-length
  //             return {
  //               start: new Date(o.date),
  //               isCustom: obj.isCustom,
  //               icon: this.icons[obj.activityType.code],
  //               color: this.colors[obj.activityType.code],
  //               draggable: false,
  //               eventDetails: obj.activityDetails,
  //               eventType: obj.activityType,
  //               action: obj.action ? obj.action : obj.customAction,
  //               roadmap: obj.roadmap,
  //             };
  //           });
  //           return ev;
  //         });
  //         this.events.push(..._.flatten(eventData));
  //         // tslint:disable-next-line:max-line-length
  //         // this.events = _.uniqBy(this.events, o => o.eventType.code === 'WC' && o.action.id === -99 && o.eventDetails.meetingDate);
  //         this.configService.setConfig({ isLoader: false });
  //         // this.refresh.next();
  //       },
  //       (err) => console.log(err)
  //     );
  // }
  onClose(){
    this.dialogRef.close({isCancel: true});
  }
}
