import { UtilsService } from './../../../../shared/utils/utils.service';
import { ConfigService } from './../../../../shared/service/config.service';
import { CalendarEvent } from './../../../../sprint/components/calendar/CalendarEvent';
import { DataService } from './../../../service/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
const baseUrl = environment.baseurl;
import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarDateFormatter,
  CalendarMonthViewDay,
  CalendarMonthViewBeforeRenderEvent,
} from 'angular-calendar';
import * as moment from 'moment';
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
import { environment } from 'src/environments/environment';
interface Week {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-configure-sprint-frequency',
  templateUrl: './configure-sprint-frequency.component.html',
  styleUrls: ['./configure-sprint-frequency.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class ConfigureSprintFrequencyComponent implements OnInit {
  assessmentId: number;
  message: any;
  userSprint: any;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  minDate = new Date();
  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDate;
  startTime;
  endTime;
  isnext: boolean = false;
  sprintDescription = new FormControl(null, [Validators.required]);
  timeslots: Week[] = [];
  buttonDisable: boolean = false;
  frequencies = [];
  isEdit = false;
  weeks: Week[] = [
    { value: 'Sunday', viewValue: 'Sunday' },
    { value: 'Monday ', viewValue: 'Monday' },
    { value: 'Tuesday ', viewValue: 'Tuesday' },
    { value: 'Wednesday ', viewValue: 'Wednesday' },
    { value: 'Thursday ', viewValue: 'Thursday' },
    { value: 'Friday ', viewValue: 'Friday' },
    { value: 'Saturday ', viewValue: 'Saturday' },
  ];

  timezone: Week[] = [
    { value: 'AM', viewValue: 'AM' },
    { value: 'PM', viewValue: 'PM' },
  ];

  selectedFrequency;
  events: CalendarEvent[] = [];
  validDate = false;
  mstart = '09:00';
  mend = '09:30';
  startMeridian = 'AM';
  endMeridian = 'AM';
  meetingStart: any;
  meetingEnd: any;
  isvalidTime: boolean = true;
  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      const month = day.date.getMonth();
      const dayOfMonth = day.date.getDate();
      if (
        this.selectedDate &&
        dayOfMonth === new Date(this.selectedDate).getDate() &&
        month === new Date(this.selectedDate).getMonth()
      ) {
        day.cssClass = 'pg-event-day';
      }
    });
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {

    if (environment.simulator == true) {
      this.frequencies = [
        { id: 2, day: 7, title: '7 Days' },
        { id: 3, day: 14, title: '14 Days' },
        { id: 4, day: 28, title: '28 Days' },
      ];
    } else {
      this.frequencies = [
        { id: 1, day: 1, title: '1 Day' },
        { id: 2, day: 7, title: '7 Days' },
        { id: 3, day: 14, title: '14 Days' },
        { id: 4, day: 28, title: '28 Days' },
      ];
    }

    for (let i = 1; i <= 12; i++) {
      this.timeslots.push({
        value: ('0' + i).slice(-2) + ':00',
        viewValue: ('0' + i).slice(-2) + ':00',
      });
      this.timeslots.push({
        value: ('0' + i).slice(-2) + ':30',
        viewValue: ('0' + i).slice(-2) + ':30',
      });
    }

    this.meetingStart = UtilsService.getDateTime(
      moment().toISOString(),
      this.mstart
    );
    this.meetingEnd = UtilsService.getDateTime(
      moment().toISOString(),
      this.mend
    );
    this.dataService.sharedMessage.subscribe((message) => {
      this.message = message;
    });
    this.getFrequencyData();
    this.dataService.nextMessage({
      action: false,
      actionGray: true,
      behaviour: false,
      behaviourGray: true,
      crew: false,
      faddev: false,
      fadfocus: false,
      frequency: true,
      isConfirm: false,
      // isEdit: false,
      outcome: false,
      outcomeGray: true,
      sprint: true,
      sprintShow: false,
      routine: true,
      step: 4,
    });
  }

  viewValue: string[] = [];
  carProperties = [
    { value: 'Stereo' },
    {
      value: 'Radio',
      subProperties: [{ value: 'Digital' }, { value: 'FM' }],
    },
    { value: 'Child seats' },
    { value: 'Rear camera' },
  ];

  valueSelected(value: string): boolean {
    return this.viewValue.indexOf(value) !== -1;
  }

  getFrequencyData() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${baseUrl}/usersprint/get-usersprint`).subscribe(
      (res1: any) => {
        if (res1.data.length > 0) {
          this.userSprint = res1.data[0];
          if (this.userSprint.duration === 4) {
            this.frequencies.splice(this.frequencies.length - 1, 1);
          }
          this.selectedFrequency = res1.data[0].frequency;
          this.selectedDate = res1.data[0].datetimeFrom;
          this.meetingStart = res1.data[0].weeklyCheckInFrom;
          this.meetingEnd = res1.data[0].weeklyCheckInTo;
          this.sprintDescription.setValue(res1.data[0].description);
          this.daySelected({ date: new Date(this.selectedDate) });
          if (res1.data[0].weeklyCheckInFrom && res1.data[0].weeklyCheckInTo) {
            this.mstart = moment(res1.data[0].weeklyCheckInFrom).format(
              'hh:mm'
            );
            this.startMeridian = moment(res1.data[0].weeklyCheckInFrom).format(
              'A'
            );
            this.mend = moment(res1.data[0].weeklyCheckInTo).format('hh:mm');
            this.endMeridian = moment(res1.data[0].weeklyCheckInTo).format('A');
          }

          this.events = [
            {
              start: new Date(this.selectedDate),
              end: new Date(this.selectedDate),
              color: 'text-white',
              allDay: true,
              draggable: false,
            },
          ];
          if (this.selectedFrequency) {
            this.dataService.nextMessage({ frequency: true });
          }
          if (this.selectedDate) {
            this.dataService.nextMessage({ isConfirm: true });
          }
        }
        this.configService.setConfig({ isLoader: false });
      },
      (err1) => {
        console.log(err1);
      }
    );
  }
  selectFrequency(id) {
    this.selectedFrequency = Number(id);
    if (this.selectedFrequency) {
      this.dataService.nextMessage({ frequency: true });
    }
  }
  daySelected(day: any): void {
    this.selectedMonthViewDay = day;
    const dateClicked = moment(this.selectedMonthViewDay.date).toISOString();
    if (this.dateIsValid(new Date(dateClicked))) {
      this.selectedDate = moment(dateClicked).toISOString();
      this.validDate = true;
      this.meetingStart = UtilsService.getDateTime(
        this.selectedDate,
        this.mstart
      ).toISOString();
      this.meetingEnd = UtilsService.getDateTime(
        this.selectedDate,
        this.mend
      ).toISOString();
      this.events = [
        {
          start: new Date(this.selectedDate),
          end: new Date(this.selectedDate),
          color: 'text-white',
          allDay: true,
          draggable: false,
        },
      ];
      if (this.dateIsValid(new Date(this.selectedDate))) {
        this.dataService.nextMessage({ isConfirm: true });
      }
    } else {
      this.validDate = false;
      this.selectedDate = null;
    }
  }
  dateIsValid(date: Date): boolean {
    return date >= this.minDate;
  }
  storeCheckIn() {
    this.buttonDisable = true;
    const sprintDescriptionText = this.sprintDescription.value;
    if (
      this.validDate &&
      sprintDescriptionText &&
      sprintDescriptionText.trim() !== ''
    ) {
      this.configService.setConfig({ isLoader: true });
      const payload = {
        datetimeFrom: UtilsService.getDateTime(
          this.selectedDate,
          '12:00 AM'
        ).toISOString(),
        datetimeTo: moment(
          moment(this.selectedDate)
            .add(this.userSprint.duration, 'w')
            .subtract(1, 'd')
            .format('YYYY-MM-DD') + ' 12:00 AM',
          'YYYY-MM-DD hh:mm A'
        ).toISOString(),
        frequency: this.selectedFrequency,
        checkInFrom: this.meetingStart,
        checkInTo: this.meetingEnd,
        description: sprintDescriptionText,
      };
      this.http
        .patch(`${baseUrl}/usersprint/update-usersprint`, payload)
        .subscribe(
          (res) => {
            this.configService.setConfig({ isLoader: false });
            if (this.message.isSprint){
              this.dataService.nextMessage({ isEdit: false });
              this.dataService.nextMessage({ isResetDesignEdit : false });
              this.router.navigate(['/design/sprint-final']);
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
    this.isnext = true;
  }

  storeCheckInnext() {
    if (!this.buttonDisable) {return}
    this.configService.setConfig({ isLoader: true });
    this.dataService.nextMessage({ isResetDesignEdit : false });
    this.router.navigate(['/design/sprint-final']);
  }

  getStartTime(time) {
    this.mstart = time;
    this.meetingStart = UtilsService.getDateTime(
      this.selectedDate,
      this.mstart + ' ' + this.startMeridian
    ).toISOString();

    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
  }

  getEndTime(time) {
    this.mend = time;
    this.meetingEnd = UtilsService.getDateTime(
      this.selectedDate,
      this.mend + ' ' + this.endMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
  }

  getStartMeridian(meridian) {
    this.startMeridian = meridian;
    this.meetingStart = UtilsService.getDateTime(
      this.selectedDate,
      this.mstart + ' ' + this.startMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
  }

  getendMeridian(meridian) {
    this.endMeridian = meridian;
    this.meetingEnd = UtilsService.getDateTime(
      this.selectedDate,
      this.mend + ' ' + this.endMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
    //  this.endMeridian = meridian
  }
}
