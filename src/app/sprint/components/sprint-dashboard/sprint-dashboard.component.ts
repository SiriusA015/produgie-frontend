import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router,ActivatedRoute } from '@angular/router';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { MANAGE_SPRINTS } from 'src/app/shared/models/constants';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';
import { environment } from 'src/environments/environment';
import { ResponseMenuDialogComponent } from './modals/response-menu-dialog/response-menu-dialog.component';
import { PortfolioSavedDialogComponent } from 'src/app/sprint/components/sprint-dashboard/modals/portfolio-saved-dialog/portfolio-saved-dialog.component';
import { SdBottomDialogComponent } from './modals/sd-bottom-dialog/sd-bottom-dialog.component';
import { Location, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sprint-dashboard',
  templateUrl: './sprint-dashboard.component.html',
  styleUrls: ['./sprint-dashboard.component.scss'],
})
export class SprintDashboardComponent implements OnInit {
  isLoading = true;
  loadCounter = 0;
  isStop = false;
  isFinished = false;
  title = 'Actions';
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  data: any;
  sprintId: number;
  username;
  showButtomDialog = false;
  sprintPortfolio = false;
  userSprint: any;
  ManageSprintTypes: Array<any> = [];
  public lineChartData: ChartDataSets[] = [
    { data: [23, 29, 35, 45, 50, 32, 16], label: 'Onboard' },
    { data: [25, 89, 10, 41, 86, 35, 10], label: 'Great Feedback' },
    { data: [15, 29, 10, 71, 96, 45, 50], label: 'Define Standards' },

  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,

    legend: {

      display: true,
      position: 'top',
      labels: {
        fontColor: '#333',
        usePointStyle: true
      }

    }

  };
  public lineChartColors: Color[] = [
    {
      pointBackgroundColor : '#675ad4',
      borderColor: '#675ad4',
      backgroundColor: 'transparent'
    },
    {
      pointBackgroundColor : '#c99d2e',
      borderColor: '#c99d2e',
      backgroundColor: 'transparent'
    },
    {
      pointBackgroundColor : '#73ceef',
      borderColor: '#73ceef',
      backgroundColor: 'transparent'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  feedback: any;
  enlistGraph: any;
  enlistLabel: any;
  enlist: any;
  filteredArray: any[];
  filteredActionArray: any[];
  filteredBehaviourArray: any;
  filteredOutcomeArray: any;
  crew: { name: string; role: string;avatar : string ;imageUrl: string; email: string; isFastForward: boolean; isFeedbackGoalsNBehaviour: boolean; };
  showdash: boolean;
  ActiveUserSprint: Object;
  isshowdevplan: any;
  isdesignEditcheck: any;
  sprintData: any;
  imageBaseUrl = environment.baseurl;

  constructor(
    public configService: ConfigService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private DataService: DataCheckService,
    private router: Router,
    private route : ActivatedRoute,
    private locationpath : Location,
  ) { 
    this.route.queryParams.subscribe((data)=>{
      if(data.save_portfolio){
        const dialogRef = this.dialog.open(PortfolioSavedDialogComponent, {
          width: '400px',
        });
        this.locationpath.replaceState('/sprint/dashboard');
      }
    })
    
   }
  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true,
    },
  };
  carouselItems = [];
  carouselItems1 = [];
  carouselItems2 = [];
  advice = [];
  ngOnInit(): void {

    const activeModule = localStorage.getItem('activeModule');

    if(activeModule === 'TEAM') {
      this.router.navigate(['teams/sprint/dashboard']);
    }

    this.getAdviceFeedback();
    this.getEnlistTrendData();
    this.username = localStorage.getItem('userName');
    this.crew = {
      name: localStorage.getItem('userName'),
      role: 'Self',
      imageUrl: localStorage.getItem('imageurl') ? this.imageBaseUrl+localStorage.getItem('imageurl') : this.imageBaseUrl+localStorage.getItem('picture'),
      avatar : localStorage.getItem('picture'),
      email: localStorage.getItem('email'),
      isFastForward: true,
      isFeedbackGoalsNBehaviour: true,
    };
    this.DataService.getAssessmentTrigger().subscribe(
      (res: any) => {
        this.showdash = res.data['isDesignComplete'];
        this.isdesignEditcheck = res.data['isDesignEdit']
        this.loadCounter += 1;

        this.http.get(`${environment.baseurl}/usersprint/get-usersprint-user`).subscribe((res: any) => {
          this.sprintData = res.data;
          this.getAllData();
        })
        this.loadCounter = 0;

      })
  }
  sprintReviewEndTimeCheck(dateTime: string) {
    return new Date(dateTime).getTime() < Date.now();
  }
  getAllData() {
    // this.loadCounter += 1;
    // this.configService.setConfig({ isLoader: true });
    this.http.get(`${environment.baseurl}/development/get-plan`).subscribe(
      (res: any) => {
        this.data = res.message;

        this.userSprint = res.message.userSprint;
        this.allaction = [...this.data.action, ...this.data.customAction];
        this.filteredActionArray = this.allaction.slice(1);
        this.allbehavior = [
          ...this.data.behaviour,
          ...this.data.customBehaviour,
        ];
        this.filteredBehaviourArray = this.allbehavior.slice(1);
        this.alloutcome = [...this.data.outcome, ...this.data.customOutcome];
        this.filteredOutcomeArray = this.alloutcome.slice(1);
        this.sprintId = this.data.userSprint.sprintId;
        this.isStop = this.data.userSprint.isStop;
        this.isFinished = this.data.userSprint.isFinished;
        setTimeout(() => {
          this.carouselItems = this.allaction;
          this.carouselItems1 = this.allbehavior;
          this.carouselItems2 = this.alloutcome;
          this.cdr.detectChanges();
        }, 1000);
        if (
          this.allaction.length > 0 &&
          this.allbehavior.length > 0 &&
          this.alloutcome.length > 0
        ) {
        }
        // this.loadCounter -= 1;
      },
      (err) => {
        console.log(err);
        this.loadCounter -= 1;
      }
    );

    this.initPageDetails();
  }

  private initPageDetails() {
    try {
      this.ManageSprintTypes = this.getManageSprintTypes();
    } catch (error) { console.log(error); }
  }

  getRole(crew) {
    if (crew.isManager) {
      return 'Manager';
    } else if (crew.isMentor) {
      return 'Mentor';
    } else if (crew.isPeerOthers) {
      return 'Peer';
    } else if (crew.isMentor) {
      return 'mentor';
    } else if (crew.isPeer) {
      return 'peer';
    } else if (crew.isTeam) {
      return 'team';
    } else if (crew.isCustomer) {
      return 'customer';
    } else if (crew.isCoach) {
      return 'coach';
    } else {
      return 'other';
    }
  }
  openResponseMenu() {
    const dialogRef = this.dialog.open(ResponseMenuDialogComponent, {
      width: '100%',
      maxWidth: '90%',
      panelClass: 'custom-menu-container',
      data: this.advice,
    });
  }
  openBottomDialog(trend) {
    const dialogRef = this.dialog.open(SdBottomDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      panelClass: 'custom-graph-container',
      data: trend,

    });
  }

  // ------------------------------------------------ NEW DEVELOPMENT ---------------------------------------------

  private getManageSprintTypes(): Array<any> {
    try {
      return MANAGE_SPRINTS;
    } catch (error) { console.log(error); }
  }
  getAdviceFeedback() {
    this.http.get(`${environment.baseurl}/development/get-af`).subscribe(
      (res: any) => {
        this.advice = res.data.advice;
        this.feedback = res.data.feedback;
        this.isLoading = false;
      },
      err => {
        console.error(err);
        this.isLoading = false;
      }
    );
  }
  getEnlistTrendData() {
    this.http.get(`${environment.baseurl}/userfeedback/trend`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.enlistGraph = res.data;
        this.enlistLabel = res.data.map(o => moment(o.date).format('DD-MMM'));
        this.enlist = res.data.map(o => o.avg);
        this.getEnlistsgraph();
        err => {
          console.error(err);
        }
      })

  }
  getEnlistsgraph() {
    this.lineChartData = [
      { data: this.enlist, label: '% Sprint Crew Responding', lineTension:0 },]
    this.lineChartLabels = this.enlistLabel;
    this.lineChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            suggestedMax: 100
          }
        }]
      },
      legend: {

        display: true,
        position: 'top',
        labels: {
          fontColor: '#333',
          usePointStyle: true
        }

      }
    }
    this.lineChartColors = [
      {
        pointBackgroundColor : '#675ad4',
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },

    ];
  }
  getUserSprint() {
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/usersprint/stop`).subscribe(
      (res: any) => {
        this.loadCounter -= 1;
        this.getAllData();
        if (this.userSprint.isStop == true) {
          this._snackBar.open('Sprint is Cancelled', 'dismiss', {
            duration: 2000,
          });
        }
        window.location.reload();

      },
      err => {
        console.error(err);
        this.loadCounter -= 1;
        this.isLoading = false;
        window.location.reload();
      }
    );
  }
  getActionActivity() {
    let data = {
      week: 2
    }
    this.loadCounter += 1;
    this.http.post(`${environment.baseurl}/actionactivity/extend-sprint`, data).subscribe(
      (res: any) => {
        this.getAllData();
        this.loadCounter -= 1;
        this._snackBar.open('Sprint is extended to 2 weeks', 'dismiss', {
          duration: 2000,
        });
      },
      err => {
        console.error(err);
        this.loadCounter -= 1;
      }
    );
  }
  updatePortFolio() {
    let data = {
      userSprintId: this.userSprint.id,
      assessmentId: this.data.assessment.id
    }
    console.log('this is send-to-portfolio-finish',data)
    this.http.patch(`${environment.baseurl}/usersprint/send-to-portfolio-finish`, data).subscribe(
      (res: any) => {
        window.location.href = "/sprint/dashboard?save_portfolio=1";
        
        // this.getAllData();
      },
      err => {
        console.error(err);
        this.isLoading = false;
      }
    );
  }

  selectName(event) {
    if (event.value == 'Cancel') {
      this.getUserSprint();
    }
    if (event.value == 'Extend 2 weeks') {
      this.getActionActivity();

    }
    if (event.value == 'Save to Portfolio') {
      this.updatePortFolio();

    }
  }

  onImgError(event,avatarImg){
    event.target.src = '/assets/avatars/'+avatarImg+'.svg';
  }
}
