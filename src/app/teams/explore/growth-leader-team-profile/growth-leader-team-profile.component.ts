import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RankService } from '../../../explore/service/rank.service';
import { DonutComponent } from './donut/donut.component';
import { DonutBoxComponent } from './donut-box/donut-box.component';
import { DonutCycleComponent } from './donut-cycle/donut-cycle.component';
import { ExploreService } from '../explore.service';
import { DetailReportCycleComponent } from './detail-report-cycle/detail-report-cycle.component';
import { DetailReportGlaComponent } from './detail-report-gla/detail-report-gla.component';

@Component({
  selector: 'app-growth-leader-team-profile',
  templateUrl: './growth-leader-team-profile.component.html',
  styleUrls: ['./growth-leader-team-profile.component.scss']
})
export class GrowthLeaderTeamProfileComponent implements OnInit {

  @ViewChild(DonutComponent) snapCircle: DonutComponent;
  @ViewChild(DonutBoxComponent) snapBox: DonutBoxComponent;
  @ViewChild(DonutCycleComponent) snapCycle: DonutCycleComponent;
  isCircle = true;
  isBox = false;
  isCycle = false;
  highest: boolean;
  lowest: boolean;
  selfChecked: boolean;
  teamMemberChecked: boolean = false;
  selectedJobRoles = [];
  isRecommended = false;
  isHighest = false;
  isLowest = false;
  reportGenerated = false;
  triggerData: any;
  capEnergise: any[];
  capPerform: any[];
  capTransform: any[];
  selectedOption = 'gla';
  profileData: any;
  donutData: any;
  teamId: string;
  rankChecked: boolean = false;
  isLoading: boolean = false;
  glaCapTransform: any[];
  glaCapEnergise: any[];
  glaCapPerform: any[];
  capabilities: any;
  fCapabilities: any;
  isErrorInReport: Boolean = false;
  infoMsg: string;

  defaultIcons = {
    "Shape External Focus & Alignment": "cap_9",
    "Develop & Empower Talent": "cap_5",
    "Set Vision And Inspire Action": "cap_4",
    "Build Stakeholder Relationships": "cap_6",
    "Structure & Execute Growth Plans": "cap_1",
    "Develop Growth Mindset": "cap_7",
    "Manage Complexity": "cap_2",
    "Build Resilience": "cap_3",
    "Lead Innovation": "cap_8",
  };

  High: any;
  recom_cycle: any;
  RankOrder: any;

  constructor(
    public rankService: RankService,
    private matDialog: MatDialog,
    private exploreService: ExploreService
  ) { }

  ngOnInit(): void {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.getGlaCapabilities();
    this.CycleView()
    // this.configService.setConfig({ isLoader: true });
    // this.teamId = '3'
    // this.dataCheck.getAssessmentTrigger().subscribe(
    //   (res: any) => {
    //     if (!res.isAgree) {
    //       this.router.navigate(['/auth/policy-consent']);
    //     }
    //     this.triggerData = res.data;
    //     this.reportGenerated = res.data['reportGenerated'];
    //     if (this.reportGenerated) {
    //       this.getCapWithRank();
    //       this.getRecommendedFad();
    //       this.getJobs();
    //         // this.getGlaCap();
    //   }
    //     else {
    //       this.configService.setConfig({ isLoader: false });
    //     }
    //   },
    //   err => {
    //     this.configService.setConfig({ isLoader: false });
    //     console.error(err);
    //   }
    // );

  }


  CycleView() {
    this.isLoading = true;
    this.exploreService.getIndiviual().subscribe((res: any) => {
      this.profileData = res;
      this.isLoading = false;
    })

    this.exploreService.getcycleDescription().subscribe((res: any) => {
      const cycleArr = res.roleDescription.map(cycleValue => {
        if (cycleValue.team_role == "Results") {
          cycleValue.priority = '1'
        }
        if (cycleValue.team_role == "Relationship") {
          cycleValue.priority = '2'
        }
        if (cycleValue.team_role == "Structured") {
          cycleValue.priority = '3'
        }
        if (cycleValue.team_role == "External") {
          cycleValue.priority = '4'
        }
        if (cycleValue.team_role == "Innovator") {
          cycleValue.priority = '5'
        }
        if (cycleValue.team_role == "Entrepreneur") {
          cycleValue.priority = '6'
        }
        return { cycleValue };

      })
      res.roleDescription.sort((a, b) => parseFloat(b.rolePercentage) - parseFloat(a.rolePercentage) || parseFloat(a.priority) - parseFloat(b.priority));
      let rankOrderArr = res.roleDescription.filter((value, index, self) => self.map(x => x.team_role).indexOf(value.team_role) == index)

      let order = 1

      this.RankOrder = rankOrderArr.map(obj => ({ ...obj, rankOrder: order++ }));

    });
  }

  onViewChange(value) {
    if (value == 'cycle') {
      this.isCycle = true;
      this.isCircle = false;
      this.isBox = false;

    }
    else if (value == 'matrix') {
      this.isBox = true;
      this.isCycle = false;
      this.isCircle = false;

    }
    else {
      this.isCircle = true;
      this.isBox = false;
      this.isCycle = false;
    }

    this.isHighest = false;
    this.isLowest = false;
    this.isRecommended = false;
    this.rankChecked = false;
    this.clearGlaFilter();
  }


  getGlaCapabilities() {
    this.isLoading = true;
    this.exploreService.GetDonutDetails().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.isErrorInReport = false;
        if (res) {
          this.capabilities = res.map((record, index) => {
            return {
              ...record,
              strategy: Math.round(record.strategyScore),
              style: Math.round(record.styleScore),
              icon: this.defaultIcons[record.capabilityName],
              rank: index + 1
            }
          });
        }

        this.glaCapEnergise = this.capabilities.filter(
          (o) => o.capabilityType.toLowerCase() === 'energize'
        );
        this.glaCapPerform = this.capabilities.filter(
          (o) => o.capabilityType.toLowerCase() === 'perform'
        );
        this.glaCapTransform = this.capabilities.filter(
          (o) => o.capabilityType.toLowerCase() === 'transform'
        );
        this.fCapabilities = [...this.glaCapPerform, ...this.glaCapTransform, ...this.glaCapEnergise];
      }, errors => {
        this.isLoading = false;
        this.isErrorInReport = true;
        this.capabilities = [];
        this.fCapabilities = [];
        this.glaCapPerform = [];
        this.glaCapTransform = [];
        this.glaCapEnergise = [];
        this.infoMsg = errors?.error?.errorMessage;
      }
    );
  }

  changeRankCheck() {
    this.rankChecked = !this.rankChecked;
    this.selfChecked = false;
    this.teamMemberChecked = false;
  }

  toggleRecommended() {

    if (this.isHighest || this.isLowest) {
      this.isHighest = false;
      this.isLowest = false;
      this.clearGlaFilter();
    }

    if (this.isRecommended) {
      this.isRecommended = !this.isRecommended;
      this.recom_cycle;
      this.clearGlaFilter();
      return;
    }

    this.isRecommended = true;
    this.fCapabilities = this.capabilities.filter((o) => o.rank >= 6);

    this.glaCapEnergise = this.fCapabilities.filter(
      (o) => o.capabilityType.toLowerCase() === 'energize'
    );
    this.glaCapPerform = this.fCapabilities.filter(
      (o) => o.capabilityType.toLowerCase() === 'perform'
    );
    this.glaCapTransform = this.fCapabilities.filter(
      (o) => o.capabilityType.toLowerCase() === 'transform'
    );
  }

  changeHighest() {
    this.isLowest = false;
    this.isRecommended = false;
    if (this.isCycle) {
      this.isHighest = !this.isHighest;
    }
    else {
      if (this.isHighest) {
        this.isHighest = false;

        this.rankService.setConfig({ rank: 'highest' });
        if (!this.isCircle) {
          this.snapBox.isExpand = { style: -1, strategy: -1 };
        }
        this.clearGlaFilter();
        return;
      }

      this.isHighest = true;
      this.rankService.setConfig({ rank: 'highest' });
      if (!this.isCircle) {
        this.snapBox.isExpand = { style: -1, strategy: -1 };
      }
      this.HighestRanked();
    }

  }

  changeLowest() {
    this.isHighest = false;
    this.isRecommended = false;
    if (this.isCycle) {
      this.isLowest = !this.isLowest;
    }
    else {
      if (this.isLowest) {
        this.isLowest = false;
        this.rankService.setConfig({ rank: 'lowest' });
        if (!this.isCircle) {
          this.snapBox.isExpand = { style: -1, strategy: -1 };
        }
        this.clearGlaFilter();
        return;
      }

      this.isLowest = true;
      this.rankService.setConfig({ rank: 'lowest' });
      if (!this.isCircle) {
        this.snapBox.isExpand = { style: -1, strategy: -1 };
      }
      this.LowestRanked();
    }

  }

  clearGlaFilter() {
    this.fCapabilities = this.capabilities;
    if (this.isCircle) {
      this.glaCapEnergise = this.fCapabilities.filter(
        (o) => o.capabilityType.toLowerCase() === 'energize'
      );
      this.glaCapPerform = this.fCapabilities.filter(
        (o) => o.capabilityType.toLowerCase() === 'perform'
      );
      this.glaCapTransform = this.fCapabilities.filter(
        (o) => o.capabilityType.toLowerCase() === 'transform'
      );
    }
  }

  HighestRanked() {
    this.fCapabilities = this.capabilities.filter((o) => o.rank <= 3);
    if (this.isCircle) {
      this.glaCapEnergise = this.fCapabilities.filter(
        (o) => o.capabilityType.toLowerCase() === 'energize'
      );
      this.glaCapPerform = this.fCapabilities.filter(
        (o) => o.capabilityType.toLowerCase() === 'perform'
      );
      this.glaCapTransform = this.fCapabilities.filter(
        (o) => o.capabilityType.toLowerCase() === 'transform'
      );
    }

  }

  LowestRanked() {
    this.fCapabilities = this.capabilities.filter((o) => o.rank >= 7);
    if (this.isCircle) {
      this.glaCapEnergise = this.fCapabilities.filter(
        (o) => o.capabilityType.toLowerCase() === 'energize'
      );
      this.glaCapPerform = this.fCapabilities.filter(
        (o) => o.capabilityType.toLowerCase() === 'perform'
      );
      this.glaCapTransform = this.fCapabilities.filter(
        (o) => o.capabilityType.toLowerCase() === 'transform'
      );
    }
    // this.restructionCapabilities();
  }

  /*   restructionCapabilities() {
      const capabilitiesArr = [];
      for (let score of this.fCapabilities) {

        let data = {
          ...score,
          strategy: Math.round(score.strategyScore),
          style: Math.round(score.styleScore),
        }

        capabilitiesArr.push(data);
      }

      this.fCapabilities = capabilitiesArr;
      console.log('this.cap', this.fCapabilities)
    } */

  changeself() {
    this.selfChecked = !this.selfChecked
    this.teamMemberChecked = false;
  }

  changeteams() {
    this.teamMemberChecked = !this.teamMemberChecked;
    this.selfChecked = false;
  }

  openGlaDetailReport() {
    const dialogRef = this.matDialog.open(DetailReportGlaComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  openCycleDetailReport() {
    const dialogRef = this.matDialog.open(DetailReportCycleComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

}
