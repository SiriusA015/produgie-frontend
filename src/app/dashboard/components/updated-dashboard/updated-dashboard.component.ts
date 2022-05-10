import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataJSONService } from '../../services/data-json.service';

import { SdBottomDialogComponent } from 'src/app/sprint/components/sprint-dashboard/modals/sd-bottom-dialog/sd-bottom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { SprintCongratulationDialogComponent } from '../modal/sprint-congratulation-dialog/sprint-congratulation-dialog.component';
import {
  CalendarView,
  CalendarDateFormatter,
  CalendarMonthViewDay,
  CalendarMonthViewBeforeRenderEvent,

} from 'angular-calendar';
import { CustomDateFormatter } from 'src/app/sprint/components/calendar/custom-date.provider';
import { CalendarEvent } from 'src/app/sprint/components/calendar/CalendarEvent';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { promises } from 'dns';
import { forkJoin, Observable } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import _ from 'lodash';
import { Location, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-updated-dashboard',
  templateUrl: './updated-dashboard.component.html',
  styleUrls: ['./updated-dashboard.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class UpdatedDashboardComponent implements OnInit {

  colors = [
    // '#f3f8ff',
    // '#f3f8ff',
    // '#f3f8ff',
    '#4339F2',
    '#FF3A29',
    '#FFB50D',
    '#34B53A',
    // '#770096'
  ];

  data1 = [];

  allData = [
    [
      // { x: 0, y: 25 },
      // { x: 25, y: 25 },
      // { x: 25, y: 50 },
      // { x: 25, y: 75 },
      // { x: 50, y: 75 }
    ],
    [
      // { x: 10, y: 25 },
      // { x: 25, y: 55 },
      // { x: 65, y: 50 },
      // { x: 25, y: 75 }
    ],
    [
      // { x: 20, y: 25 },
      // { x: 25, y: 25 },
      // { x: 34, y: 50 },
      // { x: 66, y: 20 },
    ],
    [
      // { x: 10, y: 25 },
      // { x: 25, y: 55 },
      // { x: 65, y: 50 },
      // { x: 25, y: 75 }
    ],
    // [
    //   { x: 20, y: 25 },
    //   { x: 25, y: 25 },
    //   { x: 34, y: 50 },
    //   { x: 66, y: 20 },
    // ]
  ];

  allPointTextArr = [[], [], [], []];

  axisLabel = [
    {
      xAxis: 'Outcomes',
      yAxis: 'Behavior'
    },
    {
      xAxis: 'Outcomes',
      yAxis: 'Reflection'
    },
    {
      xAxis: 'Outcomes',
      yAxis: 'Sprint Crew Engagement'
    },
    {
      xAxis: 'Outcomes',
      yAxis: 'Action'
    }
  ];

  behaviourOutcomeData: any = [];
  reflectOutcomeData: any = [];
  actionOutcomeData: any = [];

  // style = {
  //   'border-bottom-left-radius': '1.5rem',
  //   'border-bottom-right-radius': '1.5rem',
  //   'border-top-left-radius':'1.5rem',
  //   'border-top-right-radius':'1.5rem'
  // };

  style = {
    'border-bottom-left-radius': '0.5rem',
    'border-bottom-right-radius': '0.5rem'
  };

  slide = 0;
  xAxis = this.axisLabel[0].xAxis;
  yAxis = this.axisLabel[0].yAxis;

  backgroundImage = '/assets/images/bg-graph.svg';
  dataPoint = 100;
  lineWidth = 2;
  pointWidth = 2;
  pointRadius = 10;
  pointColor = '#C9C9C9';
  pointBorderColor = '#C9C9C9';
  lineColor = '#C9C9C9';
  lineNumber = false;
  isStop: any;
  pointText = [];
  sprintdifference: any;




  priorities: any = [];
  currentSprintsSlides: any = this.localDataService.currentSprintsSlides;
  myportfolioSlides: any = this.localDataService.myportfolioSlides
  loadCounter = 0;
  fadPriorities: any[] = [];
  FADs: any[] = [];
  jobRoles: any[] = [];

  data: any;
  sprintId;
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  graphsArray = ['action', 'behaviour', 'outcome'];
  glaSurveyCompleted: any = false;
  userSprint: any;
  advice: any = [];
  feedback: any = [];
  focusForDevelopment: any;
  selectedSprint: any;
  gl360statuscompleted: any = false;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  minDate = new Date();
  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDate;
  events: CalendarEvent[] = [];
  show: boolean = false;
  showportfolio: boolean = false;
  getportfoliodata: any;
  loading: boolean = false;
  isgetdata: boolean = false;
  check: any;
  disttitle: string[];
  trendingLoading: boolean = false;
  isPlanLoading: boolean = false;
  toolTipCurrentSprint: any;
  imageBaseUrl = environment.baseurl;
  constructor(
    private http: HttpClient,
    private localDataService: DataJSONService,
    private dialog: MatDialog,
    private httpService: HttpService,
    private DataService: DataCheckService,
    private configService: ConfigService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private locationpath: Location,
  ) {
    this.spinner.show();
    if(this.route.snapshot.queryParams['result']){
      const dialogRef = this.dialog.open(SprintCongratulationDialogComponent, {
        width: '850px',
        height : '454px ',
        panelClass: 'mat-dialog-background',

      });
      this.locationpath.replaceState('/dashboard/my-dashboard');
    }

  }

  ngOnInit(): void {

    localStorage.setItem('activeModule', 'LEAD');
    this.data1 = this.allData[this.slide];
    this.pointText = this.allPointTextArr[this.slide];
    this.DataService.getAssessmentTrigger().subscribe(
      (res: any) => {

        this.show = res.data['isDesignComplete'];
        if (this.show == true) {
          this.getallapis();
        }
        else {
          this.getwithoutsprintapis();
        }
      })
  }


  getwithoutsprintapis() {
    this.loading = true;
      Promise.all([
      this.gettop(),
      this.getportfolio(),
      this.checkAllStatus(),
    ])
      .then((values) => {
       this.spinner.hide();
       this.loading = false;
      });
  }


  cycleUp() {
    this.colors.push(this.colors.shift());
    if (this.slide < this.colors.length - 1) {
      this.slide++;
    } else {
      this.slide = 0;
    }
    this.data = this.allData[this.slide];
    this.xAxis = this.axisLabel[this.slide].xAxis;
    this.yAxis = this.axisLabel[this.slide].yAxis;
    this.pointText = this.allPointTextArr[this.slide];
  }
  cycleDown() {
    this.colors.unshift(this.colors.pop());
    if (this.slide > 0) {
      this.slide--;
    } else {
      this.slide = this.colors.length - 1;
    }
    this.data = this.allData[this.slide];
    this.xAxis = this.axisLabel[this.slide].xAxis;
    this.yAxis = this.axisLabel[this.slide].yAxis;
    this.pointText = this.allPointTextArr[this.slide];
  }

  getallapis() {
    this.loading = true;
    Promise.all([
      this.gettop(),
      this.getportfolio(),
      this.checkAllStatus(),
      this.getAdviceFeedback(),
      this.getCalenderData(),
      this.getAllData(),
      this.getUserSprint()
    ])
      .then((values) => {
        this.loading = false;
      });

  }

  gettop() {
     this.trendingLoading = true;
     this.http.get(`${environment.baseurl}/development/get-top`).subscribe(
      (res: any) => {
        this.trendingLoading = false;
        this.FADs = res.data.topfad;
        this.jobRoles = res.data.topjobrole;
        this.fadPriorities = res.data.topfadpriority;
      },
      err => {
        this.trendingLoading = false;
        console.log(err);
      }
    );
  }

  getAllData() {
    this.isPlanLoading = true;
    this.http.get(`${environment.baseurl}/development/get-plan`).subscribe(
      (res: any) => {
        this.isPlanLoading = false;
        if (res) {
          this.data = res.message;
          this.toolTipCurrentSprint = this.data?.userSprint?.description;
          this.localDataService.currentSprintsSlides[0]['data'] = [...this.data.action, ...this.data.customAction];
          this.localDataService.currentSprintsSlides[1]['data'] = [...this.data.behaviour, ...this.data.customBehaviour];
          this.localDataService.currentSprintsSlides[2]['data'] = [...this.data.outcome, ...this.data.customOutcome];
          this.priorities = this.data.capability;
          this.sprintId = this.data.userSprint.sprintId;
          // this.focusForDevelopment = this.priorities[0];
          this.focusForDevelopment = this.priorities.find(element => element.id == this.data.priority);
          this.selectedSprint = this.data.sprint;
        }
      },
      (err) => {
        this.isPlanLoading = false;
        console.log(err);
      }
    );
  }

  getportfolio() {
    this.http.get(`${environment.baseurl}/usersprint/portfolio/`).subscribe(
      (res: any) => {
        this.getportfoliodata = res.data;
        this.localDataService.myportfolioSlides[0]['data'] = this.getportfoliodata;
        if (res.data.length > 0) {
          this.showportfolio = true
        }
        else {
          this.showportfolio = false
        }
      },
      (err) => {
        console.log(err);
      }

    );
  }

  clickNextSlide(flag, data, max) {
    if (flag) {
      data['activeIndex'] < max - 1 ? data['activeIndex'] = data['activeIndex'] + 1 : '';
    }
    else {
      data['activeIndex'] > 0 ? data['activeIndex'] = data['activeIndex'] - 1 : '';
    }
  }

  checkAllStatus() {
    this.httpService.getAllStatus().subscribe(
      (res: any) => {
        this.glaSurveyCompleted = res.message['gla_survey_completed'];
        this.gl360statuscompleted = res.message['gla_360_survey_completed'];
        localStorage.setItem('gla_survey_completed', this.glaSurveyCompleted);
        this.configService.setStatus({ gla_survey_completed: this.glaSurveyCompleted });
        this.check = res.message['design_completed'];
      },
      (err) => {
        localStorage.setItem('gla_survey_completed', this.glaSurveyCompleted);
        this.configService.setStatus({ gla_survey_completed: this.glaSurveyCompleted });
      })

  }

  openBottomDialog(trend) {
    const dialogRef = this.dialog.open(SdBottomDialogComponent, {
      width: '100%',
      maxWidth: '600px',
      panelClass: 'custom-graph-container',
      data: this.graphsArray[trend]
    });
  }


  getUserSprint() {
    this.http.get(`${environment.baseurl}/usersprint/get-usersprint`).subscribe(
      (res: any) => {
          this.userSprint = res.data[0];
          this.isStop = this.userSprint.isStop;
          this.sprintdifference = UtilsService.calculateDayDiffFromUTCnonAbs(
            this.userSprint.datetimeFrom,
            new Date().toISOString()
          );
          const sprintdifference = UtilsService.calculateDayDiffFromUTCnonAbs(this.userSprint.datetimeFrom, new Date().toISOString());
          this.getBehaviourOutcomeEffortdData();
          this.getReflectOutcomeEffortdData();
          this.getEnlistOutcomeEffortdData();
          this.getActionOutcomeEffortdData();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  getBehaviourOutcomeEffortdData() {
    this.http.get(`${environment.baseurl}/behaviouroutcomeanalytics/effort`).subscribe(
      (res: any) => {

        this.behaviourOutcomeData = res.data.map(o => {
          return {
            x: o.outcomeAvg * 20,
            y: o.behaviourAvg * 20
          };
        });
        const pointText = res.data.map(o => o.text);
        this.allPointTextArr[0] = pointText;
        this.pointText = pointText;
        if (this.behaviourOutcomeData.length === 1) {
          this.behaviourOutcomeData.push(this.behaviourOutcomeData[0]);
        }

        this.allData[0] = this.behaviourOutcomeData;
        this.data = this.allData[0];
      },
      err => {
        console.error(err);
      }
    );
  }

  getReflectOutcomeEffortdData() {
    this.http.get(`${environment.baseurl}/behaviouroutcomeanalytics/effort-reflect`).subscribe(
      (res: any) => {

        this.reflectOutcomeData = res.data.map(o => {
          return {
            x: o.outcomeAvg,
            y: o.reflectAvg
          };
        });

        const pointText = res.data.map(o => o.text);
        this.allPointTextArr[1] = pointText;

        if (this.reflectOutcomeData.length === 1) {
          this.reflectOutcomeData.push(this.reflectOutcomeData[0]);
        }
        this.allData[1] = this.reflectOutcomeData;

      },
      err => {
        console.error(err);
      }
    );
  }

  getEnlistOutcomeEffortdData() {
    this.http.get(`${environment.baseurl}/behaviouroutcomeanalytics/effort-crew`).subscribe(
      (res: any) => {

        this.reflectOutcomeData = res.data.map(o => {
          return {
            x: o.outcomeAvg,
            y: o.crewAvg
          };
        });

        const pointText = res.data.map(o => o.text);
        this.allPointTextArr[2] = pointText;

        if (this.reflectOutcomeData.length === 1) {
          this.reflectOutcomeData.push(this.reflectOutcomeData[0]);
        }
        this.allData[2] = this.reflectOutcomeData;

      },
      err => {
        console.error(err);
      }
    );
  }

  getActionOutcomeEffortdData() {
    this.http.get(`${environment.baseurl}/behaviouroutcomeanalytics/effort-action`).subscribe(
      (res: any) => {

        this.actionOutcomeData = res.data.map(o => {
          return {
            x: o.outcomeAvg,
            y: o.actionAvg
          };
        });

        const pointText = res.data.map(o => o.text);
        this.allPointTextArr[3] = pointText;

        if (this.actionOutcomeData.length === 1) {
          this.actionOutcomeData.push(this.actionOutcomeData[0]);
        }
        this.allData[3] = this.actionOutcomeData;

      },
      err => {
        console.error(err);
      }
    );
  }

  /* Get feedback and advice */
  getAdviceFeedback() {
    this.http.get(`${environment.baseurl}/development/get-af`).subscribe(
      (res: any) => {
        this.advice = res.data.advice;
        this.feedback = res.data.feedback;
      },
      err => {
        console.error(err);
      }
    );
  }

  getCalenderData() {
    this.events = [];
    this.http.get(`${environment.baseurl}/actionactivity/get-by-date`)
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
            });
            this.events = [...tempArr];

            const title = this.events.map((event) => event.title)
            this.disttitle = [...new Set(title)]
          }
        },
        errors => {
          console.log(errors);
        });
  }

  onViewHistroy(){
    this.router.navigate(['/profile/my-history']);
  }



  onImgError(event,avatarImg){
    event.target.src = '/assets/avatars/'+avatarImg+'.svg';
   }

}




