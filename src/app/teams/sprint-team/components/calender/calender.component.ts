import { Component, OnInit, ViewChild, forwardRef, ChangeDetectorRef } from '@angular/core';
import { Calendar } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ConfigService } from '../../../../shared/service/config.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UtilsService } from '../../../../../app/shared/utils/utils.service';
import { FullCalendarComponent } from '@fullcalendar/angular';


/*  angular calender section */
import {
  CalendarView,
  CalendarDateFormatter,
  CalendarMonthViewDay,

} from 'angular-calendar';
import { CalendarEvent } from 'src/app/sprint/components/calendar/CalendarEvent';
import { NgxSpinnerService } from 'ngx-spinner';
import moment from 'moment';
import { TeamViewEventComponent } from '../team-view-event/team-view-event.component';
import { SprintServiceService } from '../../sprint-service.service';
import { CustomDateFormatter } from 'src/app/sprint/components/calendar/custom-date.provider';
import { Role } from 'src/app/auth/Role';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalenderComponent implements OnInit {
  calendarEvents = [];
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
  isDesignComplete: any;
  isDesignEdit: any;
  teamSprint;
  sprintStartDate;
  isSprintStarted: boolean = false;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public configService: ConfigService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private sprintService: SprintServiceService,
    private changeDector: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.getDesignStatus();
  }

  getAllEvents() {
    this.events = []; 
    this.spinner.show();
    this.sprintService.getAllEventsByTeamId()
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          // const WCeve = [];
          // const FFeve = [];
          // const CLEANeve = [];
          // res.map((o) => {
            
          //   const cleaneve = o.activity.filter(
          //     (obj) =>
          //       obj.activityType.code !== 'WC' && obj.activityType.code !== 'FF'
          //   );
          //   if (cleaneve.length > 0) {
          //     cleaneve.map((e) =>
          //       CLEANeve.push({ date: o.date, activity: [e] })
          //     );
          //   }
          //   const wceve = o.activity.filter(
          //     (obj) => obj.activityType.code === 'WC'
          //   );
          //   if (wceve.length > 0) {
          //     WCeve.push({ date: o.date, activity: [wceve[0]] });
          //   }
          //   const ffeve = o.activity.filter(
          //     (obj) => obj.activityType.code === 'FF'
          //   );
          //   if (ffeve.length > 0) {
          //     FFeve.push({ date: o.date, activity: [ffeve[0]] });
          //   }
          // });
          // const allCleanEvents = [...WCeve, ...FFeve, ...CLEANeve];
          // const eventData = allCleanEvents.map((o) => {

          //   const ev = o.activity.map((obj) => {
          //     return {
          //       start: new Date(o.date),
          //       isCustom: obj.isCustom,
          //       color: '#f34325',
          //       draggable: false,
          //       eventDetails: obj.activityDetails.title,
          //       eventType: obj.activityType,
          //       action: obj.action ? obj.action : obj.customAction,
          //       roadmap: obj.roadmap,
          //     };
          //   });
          //   return ev;
          // });
          // this.events.push(..._.flatten(eventData));


          /*  building event object */
          if (res) {
            let tempArr = [];
            res.forEach(element => { 
               //previously it was allCleanEvents
             
                let eventObj = {
                  start: new Date(element.meeting_time_from.split("T")),
                  end: new Date(element.meeting_time_to.split("T")),
                  title: element.activity_type.title,
                  description: element.description,
                  color: '#f34325',
                  draggable: false,
                  allDay: true,
                  selected_action_id:element.selected_action.action_id,
                  event_id:element.id
                };
                if (element.activity_type.title == 'Self Directed Learning') {
                  eventObj.color = '#d69e2e';
                }
                if (element.activity_type.title == 'Align & Communicate Action With Stakeholder') {
                  eventObj.color = 'rgba(119,0,150,.75)';
                }
                if (element.activity_type.title == 'Engage With Sprint Screw Member') {
                  eventObj.color = '#dd6b20';
                }
                if (element.activity_type.title == 'Formal/Structured Learning') {
                  eventObj.color = 'rgba(0,0,110,.75)';
                }
                if (element.activity_type.title == 'Other') {
                  eventObj.color = '#ff00e6';
                }
                tempArr.push(eventObj);
            

            });

            this.events = [...tempArr];
            
          }

          this.configService.setConfig({ isLoader: false });
          this.refresh.next();
        },
        errors => {
          this.configService.setConfig({ isLoader: false });
        });
  }

  handleEvent(action: string, event: CalendarEvent): void {

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }) {
    
    this.events.filter(data => data.start == date);

    const clickedDate = moment(date).format('MM/DD/YYYY');

    let lastAddDateForEvent: any = moment(this.lastAddDateForEvent).format('MM/DD/YYYY');

    lastAddDateForEvent = moment(lastAddDateForEvent);

    const userClickedDate = moment(clickedDate);

    const now = moment();

    /* Only open popup in between sprint start and end date */
    if (userClickedDate <= moment(this.teamSprint.start_date) || userClickedDate >= moment(this.teamSprint.end_date)) {
      this.addEventbtn = false;
      return false;
    } else {
      this.addEventbtn = true;
    }

    // if ((now > userClickedDate) || (userClickedDate > lastAddDateForEvent)) {

    //   this.addEventbtn = false;
    // }
    // else {

    //   this.addEventbtn = true;
    // }

    // let currentDate: any = new Date();

    // currentDate = moment(currentDate).format('MM/DD/YYYY')

    // if (clickedDate == currentDate) {

    //   this.addEventbtn = true;
    // }

    console.log("addEventbtn", this.addEventbtn);
    console.log("this.teamSprint.start_date", this.teamSprint.start_date);
    console.log("lastAddDateForEvent", lastAddDateForEvent);
    

    const dialogRef = this.dialog.open(TeamViewEventComponent, {
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

  getDesignStatus() {
    this.configService.setConfig({ isLoader: true });
    this.sprintService.teamDesignStatus().subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      this.isDesignComplete =res.designCompleted;
      this.isDesignEdit = res.designEdit;
      if(this.isDesignComplete){
        this.getAllEvents(); 
        this.getSprintData();
      }
    },err=>{
      this.configService.setConfig({ isLoader: false });
    })
  }


  handleEventClick(arg) {
  }

  /* on clicking event */
  eventClickHandler(e) {
    e.preventDefault();
  }


  dateClickHandler(e: any) {
    e.preventDefault();
  }

  getSprintData() {
    this.configService.setConfig({ isLoader: true });
    const activeRole = localStorage.getItem('Role');
    let teamId;
    if (activeRole == Role.TEAM_MEMBER) {
      teamId = localStorage.getItem('membertid');
    } else {
      teamId = localStorage.getItem('selectedTeamId');
    }

    this.sprintService.getSprintData(teamId).subscribe((res: any) => {
      this.teamSprint = res;
      this.teamSprint = res;
      if (res) {        

        const sprintStartDate = moment(res.start_date).format('DD-MM-YYYY');
        
        this.sprintStartDate = res.start_date
        
        const today = moment().format('DD-MM-YYYY');
  
        if (sprintStartDate <= today) {
          this.isSprintStarted = true;
        }
      }

      this.configService.setConfig({ isLoader: false });
    }, error => {
      this.configService.setConfig({ isLoader: false });
    });
  }
}
