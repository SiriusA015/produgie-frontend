import { DataService } from 'src/app/design/service/data.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DesignService } from '../design-team/design.service';
import { TeamService } from '../team.service';
import { SprintServiceService } from '../sprint-team/sprint-service.service';
import { TeamMemberServiceService } from '../team-member/team-member-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Role } from 'src/app/auth/Role';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";
import { filter } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/service/config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-activity',
  templateUrl: './team-activity.component.html',
  styleUrls: ['./team-activity.component.scss'],
})
export class TeamActivityComponent implements OnInit, OnDestroy {
  data: any;
  teamId = localStorage.getItem('selectedTeamId');
  capabilities = [];
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  userSprint: any;
  design = 'design';
  isLoading: boolean = false;
  crewMember: any;
  feedback: []
  advice: [];
  teamSprintId: number;
  accessRights;
  isAccessChecked: boolean = false;
  activity: any;
  devPlanShared: any;
  completedSprint: any;
  crew: any;
  inclusion: any;
  activityData: any;
  subscription: Subscription;

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private designService: DesignService,
    private teamService: TeamService,
    private sprintService: SprintServiceService,
    private teamMemberService: TeamMemberServiceService,
    private authService: AuthService,
    private toastr: ToastrService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.subscription = this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {

      this.configService.selectedTeamId.subscribe((subjectData: any) => {
        this.teamId = subjectData.selectedTeamId;
        this.getDashboardData();
      });
    });
    this.getDashboardData();
  }

  async getDashboardData() {
    this.isLoading = true;

    const accessToken = this.authService.getAccessToken();
    const decoded: any = jwt_decode(accessToken);
    let roleArr = decoded.Groups;

    if (!roleArr.includes(Role.TEAM_MANAGER) && roleArr.includes(Role.TEAM_MEMBER)) {
      const res = await this.checkAccessRights();
      this.accessRights = {
        teamDashboard: res['team_dashboard'],
        sprintDesign: res['sprint_design'],
        teamReport: res['team_report']
      };

      if (!this.accessRights.teamDashboard) {
        this.toastr.warning('warning', "You don't have an access of Dashboard", {
          timeOut: 3000,
        });
        this.router.navigate(['/teams/member/team-details']);
      }
    }

    this.isAccessChecked = true;

    this.dataService.nextMessage({
      faddev: true,
      fadfocus: true,
      sprint: true,
      action: true,
      behaviour: true,
      outcome: true,
      crew: true,
      frequency: true,
      isConfirm: true,
      step: 4,
    });
    this.getUserSprint();
    this.getTeamActivity();
    this.getInclusionandSafety();
    await this.getSprintData();
    this.getSprintScrew();
    this.getCapWithRank();
    this.getAdvice();
    this.getFeedBack();
  }

  getCapWithRank() {
    this.isLoading = true;
    this.http
      .get(`${environment.baseurl}/capabilityscoredata/capability-rank`)
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          this.capabilities = res.data;
          this.capabilities = this.capabilities.filter((o) => o.rank <= 3);
          this.getAllData();
        },
        (err) => {
          this.isLoading = false;
        });
  }

  getAllData() {
    this.designService.getAllSelected(this.teamSprintId).subscribe((res: any) => {
      this.alloutcome = res.outcomeList.slice(0, 3);
      this.allbehavior = res.behaviourList.slice(0, 3);
      this.allaction = res.actionList.slice(0, 6);
    });
  }

  getUserSprint() {
    this.designService.getTeamSprint(this.teamId).subscribe((res) => {
      this.userSprint = res;
    });
  }


  getAdvice() {
    this.sprintService.getAdviceData(this.teamSprintId, this.teamId).subscribe(
      (res: any) => {
        this.advice = res;
        this.isLoading = false;
      },
      err => {
        console.error(err);
        this.isLoading = false;
      });
  }
  getFeedBack() {
    this.sprintService.getFeedBackData(this.teamSprintId).subscribe(
      (res: any) => {
        this.feedback = res;
      },
      err => {
        console.error(err);
      });
  }

  getSprintScrew() {
    this.designService.getCrewMember(this.teamSprintId).subscribe((res: any) => {
      this.crewMember = res;
    });
  }

  async checkAccessRights() {
    try {
      return await this.teamMemberService.getViewingRightsDetails().toPromise();

    } catch (err) {
    };
  }

  // get team acticity data
  getTeamActivity() {
    this.isLoading = true;
    this.teamService.getTeamActivityData(this.teamId).subscribe((data: any) => {
      this.isLoading = false;
      this.activityData = data;
      this.activity = data[0];
      this.devPlanShared = (Number(this.activity.devPlanShared) / Number(this.activity.total)) * 100;
      this.completedSprint = (Number(this.activity.sprintComplete) / Number(this.activity.total)) * 100;
      this.crew = this.activity.crew;
    }, err => {
      this.isLoading = false;
      // this.toastr.warning('Warning', err?.error?.errorMessage, {
      //   timeOut: 3000,
      // });
    });
  }

  getInclusionandSafety() {
    this.isLoading = true;
    this.teamService.getInclusionData(this.teamId).subscribe((data: any) => {
      this.isLoading = false;
      this.inclusion = data;
    }, err => {
      this.isLoading = false;
      // this.toastr.warning('Warning', err?.error?.errorMessage, {
      //   timeOut: 3000,
      // });
    });
  }

  async getSprintData() {
    try {
      const sprintData: any = await this.sprintService.getSprintData(this.teamId).toPromise();
      this.teamSprintId = sprintData.sprint_id;
      localStorage.setItem('sprint_Id', sprintData.sprint_id);
      return sprintData;
    } catch (error) {
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
