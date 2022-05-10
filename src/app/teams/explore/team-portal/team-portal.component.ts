import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/shared/service/config.service';
import { TeamService } from '../../team.service';
import { ExploreService } from '../explore.service';

@Component({
  selector: 'app-team-portal',
  templateUrl: './team-portal.component.html',
  styleUrls: ['./team-portal.component.scss']
})
export class TeamPortalComponent implements OnInit {

  teamAligmentReportData: any = [];
  teamAlignData = new MatTableDataSource();
  displayedColumns = ['name', 'status', 'action'];
  timedOutCloser: any;
  glaReportData: any = [];
  isCompleted: boolean = false;
  teamId: string;
  teamInfo: any;
  team_id: any;
  show: boolean;
  data: any;
  surveyStatus: any;
  isdata: boolean;
  filterstatus: any;
  isGenerate: boolean = false;
  ishide: boolean = false;
  isInsufficient: boolean;
  statusCode: boolean;
  isLoading: boolean;
  user_id: any;
  teamAlignmentRepostStatus: any;
  sendSurveyStatus: any;
  isGeneratedReport = false;
  glcondition: any;
  istooltip: boolean = false;
  tooltiptext: string;
  activeRole: string;
  userEmail: string;

  constructor(public dialog: MatDialog,
    private exploreService: ExploreService,
    private configService: ConfigService,
    private toastr: ToastrService,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    const teamID = localStorage.getItem('selectedTeamId');
    this.user_id = localStorage.getItem('user_id');
    this.activeRole = localStorage.getItem('Role');
    this.userEmail = localStorage.getItem('email');
    this.triggerGetTeam();
    this.glareportstatus();
    this.GrowthReportList();
  }

  glareportstatus() {
    this.exploreService.glaGenarateStatus().subscribe((res: any) => {
      this.show = true;
      this.statusCode = res.status;
      this.isGeneratedReport = false;
    },
      err => {
        this.toastr.error('Error', err.error.errorMessage, {
          timeOut: 3000,
        });
        this.isGeneratedReport = false;
      });
  }

  getTeamInfo() {
    const team_id = localStorage.getItem('selectedTeamId');
    this.teamService.getteamInfoById(team_id).subscribe((res: any) => {
      this.teamInfo = res[0];
    }, err => {
      console.log("team info API error", err);
    })
  }

  triggerGetTeam() {
    this.show = false
    this.configService.teamData.subscribe((data: any) => {
      this.teamInfo = data.teamData1;
      this.team_id = data.teamId1;
      this.glaReportData = data.teamList1;
      this.getTeamInfo();
      this.glareportstatus();
      this.GrowthReportList();
      this.getAllTeamMemberData();
      this.getSurveyStatus();
      this.getSendSurveyStatus();
      this.glconditionfun();
      this.show = true;
    }, error => {
      console.log("team info API error", error);
    });
  }

  openGenerateReport() {
    this.isGeneratedReport = true;
    this.exploreService.getglaGenarateReport().subscribe((res: any) => {
      this.glareportstatus();
      this.isCompleted = true;
      this.isGenerate = false;
      this.toastr.success('Success', res.message, {
        timeOut: 3000,
      });
    }, (err) => {
      this.show = true;
      this.isGeneratedReport = false;
      console.log(err);
      this.toastr.error('Error', err.error.errorMessage, {
        timeOut: 3000,
      });
    });
  }

  glconditionfun() {
    this.exploreService.getGrowthLeaderStatus().subscribe((res: any) => {
      this.filterstatus = res.status;
      this.istooltip = false;
    },
      (err) => {
        this.glcondition = err.error.statusCode;
        this.istooltip = true;
      });
  }

  GrowthReportList() {
    this.isLoading = true;
    this.show = false;
    this.exploreService.getGrowthLeaderTeamReportList().subscribe((res1) => {
      this.show = true;
      this.glaReportData = res1;
      if (this.filterstatus == false) {
        this.isInsufficient = true;
        this.isCompleted = false;
        this.isGenerate = false;
        this.isLoading = false;
      }

      else if (this.filterstatus && this.statusCode == true) {
        this.isCompleted = true;
        this.isInsufficient = false;
        this.isGenerate = false;
      }

      else if (this.glcondition == '400') {
        this.isInsufficient = true;
        this.isCompleted = false;
        this.isGenerate = false;
        this.isLoading = false;
      }


      else if (this.filterstatus) {
        this.isGenerate = true;
        this.isInsufficient = false;
        this.isCompleted = false;
      }


    }, (err) => {
      this.isdata = true;
      console.log(err);
    })
  }

  openDialog() {
    this.show = false;
    this.exploreService.sendSurvey().subscribe((data: any) => {
      this.show = true;
      this.toastr.success('Success', data.message, {
        timeOut: 3000,
      });
      this.getSendSurveyStatus();
    }, (err) => {
      this.show = true;
      this.toastr.error('Error', err.error.errorMessage, {
        timeOut: 3000,
      });
    });
  }

  notifyToComplete(element) {
    let data;
    const teamID = localStorage.getItem('selectedTeamId');
    data = {
      team_id: teamID,
      user_id: element.id,
      user_type: element.userType
    }
    this.exploreService.notifyEmail(data).subscribe((res: any) => {
      this.toastr.success('Success', 'Notification Sent', {
        timeOut: 3000,
      });
    }, (err) => {
      console.log(err);
      this.toastr.error('Error', err.error.errorMessage, {
        timeOut: 3000,
      });
    });
  }

  // Team Alignment Report
  getAllTeamMemberData() {
    this.isLoading = true;
    this.exploreService.getAllTeamMembers().subscribe((data: any) => {
      this.teamAligmentReportData = data;
      this.isLoading = false;
    });
  }

  getSurveyStatus() {
    this.show = false;
    this.exploreService.getSurveyReportStatus().subscribe((data: any) => {
      this.show = true;
      this.surveyStatus = data.status;
    });
  }

  getSendSurveyStatus() {
    this.exploreService.getSurveyStatus().subscribe((data: any) => {
      this.sendSurveyStatus = data;
    });
  }

  generateTeamAlignReport() {
    this.show = false;
    this.exploreService.generateTeamAlignmentReport().subscribe((data: any) => {
      this.show = true;
      this.teamAlignmentRepostStatus = data;
      this.toastr.success('Success', 'Report Generated Successfully', {
        timeOut: 3000,
      });
      this.getSurveyStatus();
    }, (err) => {
      this.show = true;
      this.toastr.warning('Warning', err.error.errorMessage, {
        timeOut: 3000,
      });
    });
  }

}
