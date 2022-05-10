import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/service/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { MANAGE_SPRINTS } from 'src/app/shared/models/constants';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamGraphDialogComponent } from '../team-graph-dialog/team-graph-dialog.component';
import { SprintServiceService } from '../../sprint-service.service';
import { Role } from 'src/app/auth/Role';
import { DesignService } from 'src/app/teams/design-team/design.service';
import { TeamService } from 'src/app/teams/team.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-sprint-dashboard',
  templateUrl: './team-sprint-dashboard.component.html',
  styleUrls: ['./team-sprint-dashboard.component.scss']
})
export class TeamSprintDashboardComponent implements OnInit {
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
      borderColor: '#675ad4',
      backgroundColor: 'transparent'
    },
    {
      borderColor: '#c99d2e',
      backgroundColor: 'transparent'
    },
    {
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
  crew: { name: string; role: string; image: string; email: string; isFastForward: boolean; isFeedbackGoalsNBehaviour: boolean; };
  teamSprintId: any;
  teamSprint: any;
  crewMember: any;
  isDesignComplete: any;
  designInProcess: boolean = false;
  teamId: string;
  isDesignEdit: any;
  manageSprintAccess: boolean;
  currentSprint: any;
  activity;
  sprintStartDate;
  isSprintStarted: boolean = false;
  isMember: boolean = false;

  constructor(public configService: ConfigService,
    private http: HttpClient,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private sprintService: SprintServiceService,
    private designService: DesignService,
    private teamService: TeamService,
    private toastr: ToastrService) { }

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
  role: any;

  ngOnInit(): void {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.role = localStorage.getItem('Role');
    this.getDesignStatus();

    // dropdown access to the manager
    let manageSprintAccessRole = localStorage.getItem('Role');
    if (manageSprintAccessRole == Role.TEAM_MEMBER) {
      this.manageSprintAccess = false;
      this.isMember = true;
    } else {
      this.manageSprintAccess = true;
      this.isMember = false;
    }

    this.initPageDetails();
    this.username = localStorage.getItem('userName');
    this.crew = {
      name: localStorage.getItem('userName'),
      role: 'Self',
      image: '/assets/icons/user-1.svg',
      email: localStorage.getItem('email'),
      isFastForward: true,
      isFeedbackGoalsNBehaviour: true,
    };
  }

  getCurrentSprint() {
    this.designService.getTeamSprint(this.teamId).subscribe((res: any) => {
      this.currentSprint = res;
    }, error => {
      this.loadCounter -= 1;
      console.log(error);
    });
  }

  getSprintData() {
    this.loadCounter += 1;
    const activeRole = localStorage.getItem('Role');

    if (activeRole == Role.TEAM_MEMBER) {
      this.teamId = localStorage.getItem('membertid');
    } else {
      this.teamId = localStorage.getItem('selectedTeamId');
    }
    this.sprintService.getSprintData(this.teamId).subscribe((res: any) => {
      this.loadCounter -= 1;
      this.teamSprint = res;
      if (res) {
        localStorage.setItem('sprint_Id', res.sprint_id);

        this.teamSprintId = localStorage.getItem('sprint_Id');

        const sprintStartDate = moment(res.start_date);

        this.sprintStartDate = res.start_date

        const today = moment();

        if (sprintStartDate <= today) {
          this.isSprintStarted = true;
        }

        if (this.teamSprintId != null && this.teamSprintId != undefined) {
          this.getSliderData();
          this.getAdvice();
          this.getFeedBack();
          this.getCrewData();
          this.getEnlistTrendData();
        }
      }
    }, error => {
      this.loadCounter -= 1;
      console.log(error);
    });
  }

  getSliderData() {
    this.loadCounter += 1;
    this.sprintService.getSelectedAction(this.teamSprintId).subscribe((res: any) => {
      this.loadCounter -= 1;
      this.allaction = res.actionList;
      this.allbehavior = res.behaviourList;
      this.alloutcome = res.outcomeList;
      if (res.actionList.length > 2) {
        this.filteredActionArray = this.allaction.splice(1);
      }
      else {
        this.filteredActionArray = this.allaction;
      }
      if (this.allbehavior.length > 2) {
        this.filteredBehaviourArray = this.allbehavior.splice(1);
      }
      else {
        this.filteredBehaviourArray = this.allbehavior;
      }
      if (this.alloutcome.length > 2) {
        this.filteredOutcomeArray = this.alloutcome.splice(1);
      }
      else {
        this.filteredOutcomeArray = this.alloutcome;
      }
    }, error => {
      this.loadCounter -= 1;
      console.log(error);
    });
  }

  sprintReviewEndTimeCheck(dateTime: string) {
    return new Date(dateTime).getTime() < Date.now();
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
    // const dialogRef = this.dialog.open(ResponseMenuDialogComponent, {
    //   width: '100%',
    //   maxWidth: '90%',
    //   panelClass: 'custom-menu-container',
    //   data: this.advice,
    // });
  }

  openBottomDialog(trend) {
    const dialogRef = this.dialog.open(TeamGraphDialogComponent, {
      width: '100%',
      maxWidth: '100%',

      panelClass: 'custom-graph-container',

      data: trend,
    });
  }

  setTime(event) {
    console.log(event);
  }

  redirectToDesign() {
    this.loadCounter += 1;
    // this.configService.setConfig({ isLoader: true });
    this.http
      .patch(`${environment.baseurl}/usersprint/send-to-portfolio`, {
        userSprintId: this.data.userSprint.id,
        assessmentId: this.data.userSprint.assessmentId,
      })
      .subscribe(
        (res: any) => {
          // this.configService.setConfig({ isLoader: false });
          this.sprintPortfolio = true;
          this.loadCounter -= 1;
        },
        (err) => {
          console.log(err);
          this.loadCounter -= 1;
          // this.router.navigate(['/design/']);
        }
      );
  }

  // ------------------------------------------------ NEW DEVELOPMENT ---------------------------------------------

  private getManageSprintTypes(): Array<any> {
    try {
      return MANAGE_SPRINTS;
    } catch (error) { console.log(error); }
  }

  getAdvice() {
    this.loadCounter += 1;
    this.sprintService.getAdviceData(this.teamSprintId).subscribe(
      (res: any) => {
        this.loadCounter -= 1;
        this.advice = res;
        this.isLoading = false;
      },
      err => {
        console.error(err);
        this.loadCounter -= 1;
        this.isLoading = false;
      });
  }

  getFeedBack() {
    this.loadCounter += 1;
    this.sprintService.getFeedBackData(this.teamSprintId).subscribe(
      (res: any) => {
        this.loadCounter -= 1;
        this.feedback = res;
        this.isLoading = false;
      },
      err => {
        console.error(err);
        this.loadCounter -= 1;
        this.isLoading = false;
      });
  }

  getEnlistTrendData() {
    this.sprintService.getEnlistGraph(this.teamSprintId).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.enlistGraph = res;
        this.enlistGraph.sort((a, b) => (a.termDate > b.termDate) ? 1 : ((b.termDate > a.termDate) ? -1 : 0));
        // this.enlistLabel = res.data.map(o => o.term);
        this.enlistLabel = this.enlistGraph.map(o => moment(o.termDate).format('DD-MMM'));

        this.enlist = this.enlistGraph.map(o => o.percentage);
        this.getEnlistsgraph();


        err => {
          console.error(err);
        }
      });
  }

  getEnlistsgraph() {
    this.lineChartData = [
      { data: this.enlist, label: 'Average of Raters' },]
    this.lineChartLabels = this.enlistLabel;
    this.lineChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
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
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
    ];
  }

  getUserSprint() {
    this.loadCounter += 1;
    this.sprintService.cancelSprint(this.teamSprintId).subscribe(
      (res: any) => {
        this.loadCounter -= 1;
        // this.getAllData();
        this._snackBar.open(res?.responseMsg, 'dismiss', {
          duration: 3000,
        });

        // window.location.reload();
        this.ngOnInit() //this added for temporary
      },
      err => {
        console.error(err);
        this.loadCounter -= 1;
        this.isLoading = false;
        window.location.reload();
      });
  }

  getActionActivity() {
    this.loadCounter += 1;
    this.sprintService.extendSprint(this.teamSprintId).subscribe(
      (res: any) => {
        this.getSprintData();
        this.loadCounter -= 1;
        this._snackBar.open('Sprint is extended to 2 weeks', 'dismiss', {
          duration: 3000,
        });
      },
      err => {
        console.error(err);
        this.loadCounter -= 1;
        // this.isLoading = false;
        this.toastr.warning('Warning', err?.error?.errorMessage, {
          timeOut: 3000,
        });
      });
  }

  updatePortFolio() {
    this.sprintService.saveToPortfolio(this.teamSprintId).subscribe(
      (res: any) => {
        // this.getAllData();
      },
      err => {
        console.error(err);
        this.isLoading = false;
      });
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

  getCrewData() {
    this.sprintService.getCrewMember(this.teamSprintId).subscribe((res: any) => {
      this.crewMember = res;
    });
  }

  getDesignStatus() {
    this.sprintService.teamDesignStatus().subscribe((res: any) => {
      this.isDesignComplete = res.designCompleted;
      this.isDesignEdit = res.designEdit;
      this.designInProcess = res.designInProcess;
      if (this.isDesignComplete) {
        this.getCurrentSprint();
        this.getDashboardData();
        this.getSprintData();
      }
    });
  }

  getDashboardData() {
    this.teamService.getTeamActivityData(this.teamId).subscribe((data: any) => {

      this.activity = data[0];

    }, err => { });
  }

}
