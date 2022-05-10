import { UtilsService } from '../../../shared/utils/utils.service';
import { ConfigService } from '../../../shared/service/config.service';
import { CalendarEvent } from '../../../sprint/components/calendar/CalendarEvent';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarDateFormatter, CalendarMonthViewDay, CalendarMonthViewBeforeRenderEvent } from 'angular-calendar';
import * as moment from 'moment';
import { DataService } from 'src/app/design/service/data.service';
import { DesignService } from '../design.service';
import { ToastrService } from 'ngx-toastr';
import { CustomDateFormatter } from 'src/app/sprint/components/calendar/custom-date.provider';

interface Week {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-team-sprint-frequency',
  templateUrl: './team-sprint-frequency.component.html',
  styleUrls: ['./team-sprint-frequency.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class TeamSprintFrequencyComponent implements OnInit {

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
  isConfirmSprint = false;
  timezone: Week[] = [
    { value: 'AM', viewValue: 'AM' },
    { value: 'PM', viewValue: 'PM' },
  ];

  selectedFrequency;
  selectedteamFrequency;
  events: CalendarEvent[] = [];
  validDate = false;
  fromTime = '09:00';
  toTime = '09:30';
  startMeridian = 'AM';
  endMeridian = 'AM';
  meetingStart: any;
  meetingEnd: any;
  isvalidTime: boolean = true;
  frequency: any;
  DateSelected: string;
  selectedFrequencyID: any;
  team_checking_frequency: any;
  ArrayFrequency = [];

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
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService,
    private designService: DesignService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getFrequencyData();
    // if (environment.simulator == true) {
    //   this.frequencies = [
    //     { id: 2, day: 7, title: '4 Weeks' },
    //     { id: 3, day: 14, title: '8 Weeks' },
    //     { id: 4, day: 28, title: '12 Weeks' },
    //   ];
    // } else {
    //   this.frequencies = [
    //     { id: 1, day: 1, title: '1 Week' },
    //     { id: 2, day: 7, title: '4 Weeks' },
    //     { id: 3, day: 14, title: '8 Weeks' },
    //     { id: 4, day: 28, title: '12 Weeks' },
    //   ];
    // }

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
    
    this.dataService.sharedMessage.subscribe((message) => {
      this.message = message;
      if (message['isEdit']) {
        this.designService.getScheduleRoutineDetails().subscribe((res:any) => {
          this.sprintDescription.setValue(res?.sprint_description);
          this.fromTime = moment(res?.from_time).format('hh:mm');
          this.toTime = moment(res?.to_time).format('hh:mm');
          this.startMeridian = moment(res?.from_time).format('A');
          this.endMeridian = moment(res?.to_time).format('A');
          this.selectedFrequency = res?.feedbackFrequency;
          this.selectedteamFrequency = res?.team_checking_frequency;
          this.selectedDate = res?.from_time;
          this.selectedFrequency = res?.feedbackFrequency / 7; //converted to weeks for temporary because API not return in week format
          this.selectedteamFrequency = res?.team_checking_frequency / 7; //converted to weeks for temporary because API not return in week format
          this.daySelected({ date: new Date(this.selectedDate) });
        })
      }
    });

    this.dataService.nextMessage({
      action: false,
      actionGray: true,
      behaviour: false,
      behaviourGray: true,
      crew: false,
      faddev: false,
      fadfocus: false,
      frequency: false,
      isConfirm: false,
      isEdit: false,
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
    this.designService.getFeedbackFrequencies().subscribe(
      (res1: any) => {
        let obj = {}
        for (let x in res1) {
          if (res1[x] === true) {
            obj[x] = res1[x];
          }
        }
        this.frequency = Object.keys(obj);
        // this.frequency = f.slice(1);
        for (let i = 0; i < this.frequency.length; i++) {
          var e = this.frequency[i];
          e = e.substring(2)
          if (e == '4Weeks' || e == '8Weeks' || e == 'isFortnightly') {
            e = e.substring(0, 1) + " " + e.substring(1, e.length);
          }
          else if (e == '12Weeks') {
            e = e.substring(0, 2) + " " + e.substring(2, e.length);
          }
          this.ArrayFrequency.push(e);
        }
        this.configService.setConfig({ isLoader: false });
      },
      (err1) => { }
    );
  }

  selectFrequency(frequency) {
    this.selectedFrequency = frequency;
    if (frequency == "4 Weeks") {
      this.selectedFrequencyID = 4
    } else if (frequency == "8 Weeks") {
      this.selectedFrequencyID = 8
    } else if (frequency == "12 Weeks") {
      this.selectedFrequencyID = 12
    } else {
      this.selectedFrequencyID = 2
    }
    if (this.selectedFrequency) {
      this.dataService.nextMessage({ frequency: true });
    }
  }

  selectteamFrequency(teamfrequency) {
    this.selectedteamFrequency = teamfrequency;
    if (teamfrequency == "4 Weeks") {
      this.team_checking_frequency = 4
    } else if (teamfrequency == "8 Weeks") {
      this.team_checking_frequency = 8
    } else if (teamfrequency == "12 Weeks") {
      this.team_checking_frequency = 12
    } else {
      this.team_checking_frequency = 2
    }
    if (this.selectedteamFrequency) {
      this.dataService.nextMessage({ frequency: true });
    }
  }

  daySelected(day: any): void {
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [day, mnth, date.getFullYear()].join("-");
    }
    // this.DateSelected = convert(day.date);
    this.selectedMonthViewDay = day;
    const dateClicked = moment(this.selectedMonthViewDay.date).toISOString();
    if (this.dateIsValid(new Date(dateClicked))) {
      this.selectedDate = moment(dateClicked).toISOString();
      this.validDate = true;
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
    this.isConfirmSprint = true;

    if (!this.meetingStart) {
      this.getStartTime(this.fromTime);
    }

    if (!this.meetingEnd) {
      this.getEndTime(this.toTime);
    }
    const startTimewithMeridian = this.fromTime + ' ' + this.startMeridian;
    const payload = {
      "team_id": localStorage.getItem('selectedTeamId'),
      "checkinDate": UtilsService.getDateTime(this.selectedDate,startTimewithMeridian).toISOString(),
      "sprint_description": this.sprintDescription.value,
      "fromTime": this.meetingStart,
      "toTime": this.meetingEnd,
      "feedbackFrequency": this.selectedFrequencyID,
      "sprint_id": localStorage.getItem('sprint_Id'),
      "team_checking_frequency": this.team_checking_frequency
    };

    if (payload.fromTime == null || payload.toTime == null || payload.feedbackFrequency == undefined) {
      this.toastr.warning('warning', "please select values", {
        timeOut: 3000,
      });
      this.isConfirmSprint = false;
    }
    else {
      this.designService.scheduleRoutine(payload)
        .subscribe(
          (res) => {
            this.isConfirmSprint = false;
            this.router.navigate(['/teams/design/dev-plan']);
          },
          (err) => {
            this.isConfirmSprint = false;
            this.toastr.error('error', "Something is Missing", {
              timeOut: 3000,
            });
            console.log(err);
          }
        );
    }
    this.isnext = true;
  }

  // getStartTime(time) {
  //   this.fromTime = time;
  //   this.meetingStart = UtilsService.getDateTime(
  //     this.DateSelected,
  //     this.fromTime + ' ' + this.startMeridian
  //   ).toISOString();
  //   // this.isvalidTime = ((this.toTime + ' ' + this.endMeridian) > (this.fromTime + ' '+ this.startMeridian));
  //   // console.log(this.isvalidTime, "getStartTime")
  // }

  // getEndTime(time) {
  //   this.toTime = time;
  //   this.isvalidTime = ((this.toTime + ' ' + this.endMeridian) > (this.fromTime + ' ' + this.startMeridian));

  // }

  // getStartMeridian(meridian) {
  //   this.startMeridian = meridian;
  //   this.isvalidTime = ((this.toTime + ' ' + this.endMeridian) > (this.fromTime + ' ' + this.startMeridian));
  //   console.log(this.isvalidTime, "getStartMeridian")
  // }

  // getendMeridian(meridian) {
  //   this.endMeridian = meridian;
  //   this.isvalidTime = ((this.toTime + ' ' + this.endMeridian) > (this.fromTime + ' ' + this.startMeridian));
  //   console.log(this.isvalidTime, "getendMeridian")
  // }


  getStartTime(time) {
    this.fromTime = time;
    this.meetingStart = UtilsService.getDateTime(
      this.selectedDate,
      this.fromTime + ' ' + this.startMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
  }

  getEndTime(time) {
    this.toTime = time;
    this.meetingEnd = UtilsService.getDateTime(
      this.selectedDate,
      this.toTime + ' ' + this.endMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
  }

  getStartMeridian(meridian) {
    this.startMeridian = meridian;
    this.meetingStart = UtilsService.getDateTime(
      this.selectedDate,
      this.fromTime + ' ' + this.startMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
  }

  getendMeridian(meridian) {
    this.endMeridian = meridian;
    this.meetingEnd = UtilsService.getDateTime(
      this.selectedDate,
      this.toTime + ' ' + this.endMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
    //  this.endMeridian = meridian
  }

}

