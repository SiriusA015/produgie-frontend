import { ConfigService } from './../../../shared/service/config.service';
import { AddEventCalendarDialogComponent } from './../modals/add-event-calendar-dialog/add-event-calendar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewEventCalendarDialogComponent } from './../modals/view-event-calendar-dialog/view-event-calendar-dialog.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarDateFormatter,
} from 'angular-calendar';
import { CalendarEvent } from './CalendarEvent';
import { CustomDateFormatter } from './custom-date.provider';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AddEventBottomDialogComponent } from '../modals/add-event-bottom-dialog/add-event-bottom-dialog.component';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalendarComponent implements OnInit {
  isStop = false;
  isFinished = false;
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
  view: CalendarView = CalendarView.Month;
  selectedDate;
  CalendarView = CalendarView;
  today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0
  );
  viewDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0
  );
  events = [];
  selectedEvent = [];
  refresh = new Subject();
  activeDayIsOpen = false;
  userSprint: any;
  isActiveUserSprint = false;
  sprintdifference: number;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public configService: ConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserSprint();
    // this.getAllEvents();
  }

  getAllEvents() {
    this.events = [];
    this.http
      .get(`${environment.baseurl}/actionactivity/get-by-date`)
      .subscribe(
        (res: any) => {
          const WCeve = [];
          const FFeve = [];
          const CLEANeve = [];
          res.data.map((o) => {
            const cleaneve = o.activity.filter(
              (obj) =>
                obj.activityType.code !== 'WC' && obj.activityType.code !== 'FF'
            );
            if (cleaneve.length > 0) {
              cleaneve.map((e) =>
                CLEANeve.push({ date: o.date, activity: [e] })
              );
            }
            const wceve = o.activity.filter(
              (obj) => obj.activityType.code === 'WC'
            );
            if (wceve.length > 0) {
              WCeve.push({ date: o.date, activity: [wceve[0]] });
            }
            const ffeve = o.activity.filter(
              (obj) => obj.activityType.code === 'FF'
            );
            if (ffeve.length > 0) {
              FFeve.push({ date: o.date, activity: [ffeve[0]] });
            }
          });
          const allCleanEvents = [...WCeve, ...FFeve, ...CLEANeve];
          const eventData = allCleanEvents.map((o) => {
            const ev = o.activity.map((obj) => {
              // tslint:disable-next-line:max-line-length
              return {
                start: new Date(o.date),
                isCustom: obj.isCustom,
                icon: this.icons[obj.activityType.code],
                color: this.colors[obj.activityType.code],
                draggable: false,
                eventDetails: obj.activityDetails,
                eventType: obj.activityType,
                action: obj.action ? obj.action : obj.customAction,
                roadmap: obj.roadmap,
              };
            });
            return ev;
          });
          this.events.push(..._.flatten(eventData));
          // tslint:disable-next-line:max-line-length
          // this.events = _.uniqBy(this.events, o => o.eventType.code === 'WC' && o.action.id === -99 && o.eventDetails.meetingDate);
          this.configService.setConfig({ isLoader: false });
          this.refresh.next();
        },
        (err) => console.log(err)
      );
  }
  getUserSprint() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${environment.baseurl}/usersprint/get-usersprint`).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.userSprint = res.data[0];
          this.isActiveUserSprint = true;
          this.isStop = this.userSprint.isStop;
          this.isFinished = this.userSprint.isFinished;
          if (this.isFinished && !this.userSprint.sprintReviewEndTime) {
            this.configService.setConfig({ isLoader: false });
            this.router.navigate(['sprint/congratulations']);
          } else {
            this.sprintdifference = UtilsService.calculateDayDiffFromUTCnonAbs(
              this.userSprint.datetimeFrom,
              new Date().toISOString()
            );
            const sprintdifference = UtilsService.calculateDayDiffFromUTCnonAbs(
              this.userSprint.datetimeFrom,
              new Date().toISOString()
            );
            if (sprintdifference < 0) {
              this.configService.setConfig({ isLoader: false });
              this.router.navigate(['/sprint/not-started']);
            } else {
              this.getAllEvents();
            }
          }
        } else {
          this.configService.setConfig({ isLoader: false });
        }
      },
      (err) => {
        console.error(err);
        this.configService.setConfig({ isLoader: false });
      }
    );
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    this.selectedDate = date;
    if (this.sprintdifference >= 0) {
      const sprintStartDate = new Date(this.userSprint.dateTimeFrom);
      const sprintEndDate = new Date(this.userSprint.datetimeTo);
      this.selectedEvent = events;
      if (
        this.selectedDate &&
        this.selectedDate === date &&
        date <= sprintEndDate
      ) {
        if (this.selectedDate < this.today && this.selectedEvent.length === 0) {
          console.log('do nothing');
        } else {
          const dialogRef = this.dialog.open(AddEventBottomDialogComponent, {
            width: '100%',
            maxWidth: '100%',
            data: {
              selectedDate: this.selectedDate,
              selectedEvent: this.selectedEvent,
              isStop: this.isStop,
              isFinished: this.isFinished,
              today: this.today,
            },
            panelClass: 'custom-dialog-container',
            position: { left: '0', bottom: '50' },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (!result.isCancel) {
              this.getAllEvents();
            }
          });
        }
      }
    }
  }
  openAddDialog() {
    const day = this.selectedDate;
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
        this.activeDayIsOpen = false;
        this.getAllEvents();
      }
    });
  }
  openViewDialog(event) {
    const day = this.selectedDate;
    const dialogRef = this.dialog.open(ViewEventCalendarDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      data: { day, event, isStop: this.isStop, isFinished: this.isFinished },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.activeDayIsOpen = false;
        this.getAllEvents();
      }
    });
  }
  closeDialog() {
    this.activeDayIsOpen = false;
  }
}
