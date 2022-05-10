import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Role } from 'src/app/auth/Role';
import { TeamMemberServiceService } from '../../team-member/team-member-service.service';
import { ExploreService } from '../explore.service';

@Component({
  selector: 'app-explore-navbar',
  templateUrl: './explore-navbar.component.html',
  styleUrls: ['./explore-navbar.component.scss']
})
export class ExploreNavbarComponent implements OnInit, OnChanges {
  isTeamPortalVisible: boolean = false;
  isReportAllowed: boolean = false;
  filterstatus: any;
  glaReportData: Object;
  glcondition: string;
  statusCode: any;
  isGeneratedReport: boolean;
  @Input() surveyStatus: any;
  @Input() isCompleted: any;
  isCompletedForGLA: boolean;
  isLoading: boolean;
  isStatusLoading: boolean;
  surveyStatusForTAR: any;

  constructor(private exploreService: ExploreService,
    public teamMemberService: TeamMemberServiceService) { }

  ngOnChanges() { }

  ngOnInit(): void {
    
    this.glconditionfun();
    this.getSurveyStatus();
    let activeRole = localStorage.getItem('Role');
    if (activeRole == Role.TEAM_MANAGER) {
      this.isTeamPortalVisible = true;
    } else {
      this.getViewDetailData();
    }
  }

  getViewDetailData() {
    this.teamMemberService.getViewingRightsDetails().subscribe((res: any) => {
      this.isReportAllowed = res.team_report;
    },
      err => console.error("error", err)
    );
  }

  glconditionfun() {
    this.isLoading = true;
    this.exploreService.getGrowthLeaderStatus().subscribe((res: any) => {
      this.filterstatus = res.status;
      this.glareportstatus()
    },
      (err) => {
        this.isLoading = false;
      });
  }

  getSurveyStatus() {
    this.isStatusLoading = true;
    this.exploreService.getSurveyReportStatus().subscribe((data: any) => {
      this.isStatusLoading = false;
      this.surveyStatusForTAR = data.status;
    }, error => {
      this.isStatusLoading = false;
    });
  }

  glareportstatus() {
    this.exploreService.glaGenarateStatus().subscribe((res: any) => {
      this.statusCode = res.status;
      this.isGeneratedReport = false;
      this.growthReportList()
    },
      err => {
        this.isLoading = false;
        this.isGeneratedReport = false;

        console.log(err.error.errorMessage, "testing")
      });
  }

  growthReportList() {
    this.exploreService.getGrowthLeaderTeamReportList().subscribe((res1) => {
      this.glaReportData = res1;
      this.isLoading = false;
      if (this.filterstatus == false) {
        this.isCompletedForGLA = false;
      }
      else if (this.filterstatus && this.statusCode == true) {
        this.isCompletedForGLA = true;
      }
      else if (this.glcondition == '400') {
        this.isCompletedForGLA = false;
      }
      else if (this.filterstatus) {
        this.isCompletedForGLA = false;
      }
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }

}
