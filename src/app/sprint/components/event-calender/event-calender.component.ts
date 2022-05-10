import { Component, OnInit, ViewChild, forwardRef, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, EventInput, Calendar } from '@fullcalendar/angular'; // useful for typechecking
import { ViewEventComponent } from '../view-event/view-event.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ConfigService } from '../../../shared/service/config.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UtilsService } from '../../../../app/shared/utils/utils.service';
import { FullCalendarComponent } from '@fullcalendar/angular';

/*  angular calender section */
import {
  CalendarView,
  CalendarDateFormatter,
  CalendarMonthViewDay,

} from 'angular-calendar';
import { CalendarEvent } from 'src/app/sprint/components/calendar/CalendarEvent';
import { CustomDateFormatter } from '../calendar/custom-date.provider';
import { NgxSpinnerService } from 'ngx-spinner';
import moment from 'moment';

@Component({
  selector: 'app-event-calender',
  templateUrl: './event-calender.component.html',
  styleUrls: ['./event-calender.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class EventCalenderComponent implements OnInit {
  calendarEvents = [];
  // events: any[];
  icons: any;
  colors: any;
  refresh = new Subject();
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  calendarWeekends = true;
  lastAddDateForEvent: any;

  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;

  calendarApi: Calendar;
  initialized = false;

  /*  calender section */
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate = new Date();


  // minDate = new Date();
  public today = new Date();
  public minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDate;
  events: CalendarEvent[] = [];
  addEventbtn: boolean = false;
  dd: any;
  mm: any;
  yyyy: any;
  userSprint: any;
  isStop: any;
  frequency: any;
  sprintdifference: any;
  sprintDay: number;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public configService: ConfigService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private changeDector: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.getUserSprint();
  }

  ngAfterViewChecked() {
    // this.calendarApi = this.calendarComponent.getApi();

    // if (this.calendarApi && !this.initialized) {
    //   this.initialized = true;
    // this.getAllEvents();
    // }
  }

  getAllEvents() {
    this.events = [];
    this.configService.setConfig({ isLoader: true });
    this.http
      .get(`${environment.baseurl}/actionactivity/get-by-date`)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
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
                // icon: this.icons[obj.activityType.code],
                color: '#f34325',
                draggable: false,
                eventDetails: obj.activityDetails.title,
                eventType: obj.activityType,
                action: obj.action ? obj.action : obj.customAction,
                roadmap: obj.roadmap,
              };
            });

            return ev;
          });
          this.events.push(..._.flatten(eventData));


          /*  building event object */
          if (res) {
            // const events = res.data;
            let tempArr = [];
            allCleanEvents.forEach(element => {
              element.activity.forEach(eventInfo => {

                let eventObj = {
                  start: new Date(element.date),
                  end: new Date(element.date),
                  title: eventInfo.activityType.title,
                  description: eventInfo,
                  color: '#f34325',
                  draggable: false,
                  allDay: true,
                };
                if (eventInfo.activityType.title == 'Self Directed Learning') {
                  eventObj.color = '#d69e2e';
                }
                if (eventInfo.activityType.title == 'Align & Communicate Action With Stakeholder') {
                  eventObj.color = 'rgba(119,0,150,.75)';
                }
                if (eventInfo.activityType.title == 'Engage With Sprint Screw Member') {
                  eventObj.color = '#dd6b20';
                }
                if (eventInfo.activityType.title == 'Formal/Structured Learning') {
                  eventObj.color = 'rgba(0,0,110,.75)';
                }
                if (eventInfo.activityType.title == 'Other') {
                  eventObj.color = '#ff00e6';
                }
                tempArr.push(eventObj);
              });



              // this.calendarEvents.push(eventObj);
              // this.calendarApi.removeAllEventSources();
              // this.calendarApi.addEventSource(this.calendarEvents);
            });

            this.events = [...tempArr];
          }

          // tslint:disable-next-line:max-line-length
          // this.events = _.uniqBy(this.events, o => o.eventType.code === 'WC' && o.action.id === -99 && o.eventDetails.meetingDate);
          this.configService.setConfig({ isLoader: false });
          // this.configService.setConfig({ isLoader: false });
          this.refresh.next();
        },
        errors => {
          this.configService.setConfig({ isLoader: false });
          console.log(errors);

        });
  }

  handleEvent(action: string, event: CalendarEvent): void {

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    this.events.filter(data => data.start == date);

    const clickedDate = moment(date).format('MM/DD/YYYY');

    let lastAddDateForEvent: any = moment(this.lastAddDateForEvent).format('MM/DD/YYYY');

    lastAddDateForEvent = moment(lastAddDateForEvent);

    const userClickedDate = moment(clickedDate);

    const now = moment();

    if ((now > userClickedDate) || (userClickedDate > lastAddDateForEvent)) {

      this.addEventbtn = false;
    }
    else {

      this.addEventbtn = true;
    }

    let currentDate: any = new Date();

    currentDate = moment(currentDate).format('MM/DD/YYYY')

    if (clickedDate == currentDate) {

      this.addEventbtn = true;
    }

    const dialogRef = this.dialog.open(ViewEventComponent, {
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      height: '100%',
      data: {
        events, date,
        showBtn: this.addEventbtn,
        lastAddDateForEvent: moment(this.lastAddDateForEvent).format('MM/DD/YYYY')
      },
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result.isNewEventAdded) {
        this.getAllEvents();
      }
    });
  }

  getUserSprint() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(environment.baseurl + `/usersprint/get-usersprint`).subscribe((result: any) => {
      this.configService.setConfig({ isLoader: false });
      this.lastAddDateForEvent = result.data[0].datetimeTo;
      this.userSprint = result.data[0];
      this.isStop = this.userSprint.isStop;
      this.frequency = this.userSprint.frequency;

      const sprintdifference = UtilsService.calculateSecDiffFromUTCnonAbs(this.userSprint.datetimeFrom, new Date().toISOString());
      if (sprintdifference <= 0) {
        this.configService.setConfig({ isLoader: false });
        // this.router.navigate(['/sprint/not-started']);
        this.sprintDay = 0;
      }
      else {
        this.getAllEvents();
      }
    }, errors => {
      this.configService.setConfig({ isLoader: false });
      console.log(errors);
    });
  }

  /* on clicking event */
  eventClickHandler(e) {
    e.preventDefault();

  }


  dateClickHandler(e: any) {
    e.preventDefault();

  }

}
