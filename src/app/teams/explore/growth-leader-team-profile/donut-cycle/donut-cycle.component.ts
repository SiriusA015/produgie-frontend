import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RankService } from 'src/app/explore/service/rank.service';
import { SharedCycleReportComponent } from 'src/app/shared/components/shared-cycle-report/shared-cycle-report.component';
import { ExploreService } from '../../explore.service';

@Component({
  selector: 'app-donut-cycle',
  templateUrl: './donut-cycle.component.html',
  styleUrls: ['./donut-cycle.component.scss']
})
export class DonutCycleComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>;
  @Input() Profile = 'avatar_10';
  @Input() rankChecked;
  @Input() isHighest;
  @Input() profileData: any[] = [];
  @Input() selfChecked;
  @Input() teamMemberChecked;
  @Input() RankOrder;
  @Input() isRecommended;
  @Input() isLowest;
  @Input() description
  profilevalue: { role: string; users: any[]; }[];
  profileresult: any[];
  profileExternal: any[];
  profileRelationship: any[];
  profileEntrepreneurial: any[];
  profileStructured: any[];
  profileInnovator: any[];
  role: any[];
  UserID: string;
  userProfileresult: any = [];
  userProfileExternal: any = [];
  userProfileEntrepreneurial: any = [];
  userProfileRelationship: any = [];
  userProfileStructured: any = [];
  userProfileInnovator: any = [];
  TeamProfileresult: any[];
  TeamProfileExternal: any[];
  TeamProfileEntrepreneurial: any[];
  TeamProfileRelationship: any[];
  TeamProfileStructured: any[];
  TeamProfileInnovator: any[];
  performance: any;
  performanceW: any;
  loadCounter: number;
  team_id: string;
  hideInnovator = true;
  hideEntrepreneur = true;
  hideExternal = true;
  hideRelationship = true;
  hideResults = true;
  hideStructured = true;
  profilepic: string;
  relationshipRank: any;
  externalRank: any;
  entrepreneurRank: any;
  innovatorRank: any;
  resultRank: any;
  structuredRank: any;
  ranks: any = []

  constructor(
    public dialog: MatDialog,
    public rankService: RankService,
    private exploreService: ExploreService
  ) { }

  ngOnInit(): void {
    this.team_id = localStorage.getItem('selectedTeamId');
    this.checkHighOrLow();
  }

  checkHighOrLow() {
    this.exploreService.getcycleDescription().subscribe((res: any) => {
      this.description = res['roleDescription'];
    });
  }

  ngOnChanges() {
    if (this.description) {
      this.applyHighestOrLowest();
    }

    this.applyRankOrder();
    this.UserID = localStorage.getItem('user_id');
    let newdata = this.profileData.map((ele) => ele.data);
    newdata.map(data => {
      if (data.avatar == null) {
        data.avatar = "avatar_10"
      }
    })
    let result = [
      {
        role: 'Results',
        users: [],
      },
      {
        role: 'External',
        users: []
      },
      {
        role: 'Entrepreneurial',
        users: []
      },
      {
        role: 'Relationship',
        users: []
      },
      {
        role: 'Structured',
        users: []
      },
      {
        role: 'Innovator',
        users: []
      },
    ];


    for (let i = 0; i < newdata.length; i++) {
      for (let j = 0; j < newdata[i].role.length; j++) {
        if (newdata[i].role[j].name == 'Results') {

          result[0].users.push(newdata[i].avatar);
        } else if (newdata[i].role[j].name == 'External') {
          result[1].users.push(newdata[i].avatar);
        } else if (newdata[i].role[j].name == 'Entrepreneurial') {
          result[2].users.push(newdata[i].avatar);
        } else if (newdata[i].role[j].name == 'Relationship') {
          result[3].users.push(newdata[i].avatar);
        } else if (newdata[i].role[j].name == 'Structured') {
          result[4].users.push(newdata[i].avatar);
        } else if (newdata[i].role[j].name == 'Innovator') {
          result[5].users.push(newdata[i].avatar);
        }

      }
    }

    this.profileresult = result[0].users;
    this.profileExternal = result[1].users;
    this.profileEntrepreneurial = result[2].users;
    this.profileRelationship = result[3].users;
    this.profileStructured = result[4].users;
    this.profileInnovator = result[5].users;

    if (this.teamMemberChecked) {
      this.TeamProfileInnovator = this.profileInnovator
      console.log(this.TeamProfileInnovator, "TeamProfileInnovator")
      this.TeamProfileEntrepreneurial = this.profileEntrepreneurial;
      console.log(this.TeamProfileEntrepreneurial, "TeamProfileEntrepreneurial")

      this.TeamProfileresult = this.profileresult;
      console.log(this.TeamProfileresult, "TeamProfileresult")

      this.TeamProfileStructured = this.profileStructured;
      console.log(this.TeamProfileStructured, "TeamProfileStructured")

      this.TeamProfileRelationship = this.profileRelationship;
      console.log(this.TeamProfileRelationship, "TeamProfileRelationship")

      this.TeamProfileExternal = this.profileExternal;
      console.log(this.TeamProfileExternal, "TeamProfileExternal")

      this.selfChecked = false;
    }

    else {
      this.userProfileInnovator[0] = this.profileInnovator.find(o => o == this.UserID);
      console.log(this.userProfileInnovator, "userProfileInnovator")
      if (this.userProfileInnovator[0] == undefined || !this.selfChecked) {
        this.userProfileInnovator = []
      }
      else {

        this.userProfileInnovator[0] = this.profileInnovator.find(o => o == this.UserID);
      }


      this.userProfileEntrepreneurial[0] = this.profileEntrepreneurial.find(o => o == this.UserID);
      if (this.userProfileEntrepreneurial[0] == undefined || !this.selfChecked) {
        this.userProfileEntrepreneurial = []
      }
      else {
        this.userProfileEntrepreneurial[0] = this.profileEntrepreneurial.find(o => o == this.UserID);
      }


      this.userProfileresult[0] = this.profileresult.find(o => o == this.UserID);
      if (this.userProfileresult[0] == undefined || !this.selfChecked) {
        this.userProfileresult = []
      }
      else {
        this.userProfileresult[0] = this.profileresult.find(o => o == this.UserID);

      }


      this.userProfileStructured[0] = this.profileStructured.find(o => o == this.UserID);
      if (this.userProfileStructured[0] == undefined || !this.selfChecked) {
        this.userProfileStructured = []
      }
      else {
        this.userProfileStructured[0] = this.profileStructured.find(o => o == this.UserID);
      }


      this.userProfileRelationship[0] = this.profileRelationship.find(o => o == this.UserID);
      if (this.userProfileRelationship[0] == undefined || !this.selfChecked) {
        this.userProfileRelationship = []
      }
      else {
        this.userProfileRelationship[0] = this.profileRelationship.find(o => o == this.UserID);
      }


      this.userProfileExternal[0] = this.profileExternal.find(o => o == this.UserID);
      if (this.userProfileExternal[0] == undefined || !this.selfChecked) {
        this.userProfileExternal = []
      }
      else {
        this.userProfileExternal[0] = this.profileExternal.find(o => o == this.UserID);
      }
      this.teamMemberChecked = false;
    }

  }

  ngAfterViewInit() {
    // this.Description();
    if (this.wrapper.nativeElement.offsetWidth > 0) {
      this.wrapper.nativeElement.style.height =
        this.wrapper.nativeElement.offsetWidth + 'px';
    }
  }

  onResize() {
    if (this.wrapper.nativeElement.offsetWidth > 0) {
      this.wrapper.nativeElement.style.height =
        this.wrapper.nativeElement.offsetWidth + 'px';
    }
  }


  applyRankOrder() {
    this.RankOrder.filter(value => {
      if (value.team_role == "Relationship") {
        this.ranks.push(value.rankOrder);
        this.relationshipRank = value.rankOrder;
      }
      if (value.team_role == "External") {
        this.ranks.push(value.rankOrder);
        this.externalRank = value.rankOrder;
      }
      if (value.team_role == "Entrepreneur") {
        this.ranks.push(value.rankOrder);
        this.entrepreneurRank = value.rankOrder;
      }
      if (value.team_role == "Results") {
        this.ranks.push(value.rankOrder);
        this.resultRank = value.rankOrder;
      }
      if (value.team_role == "Structured") {
        this.ranks.push(value.rankOrder);
        this.structuredRank = value.rankOrder;
      }
      if (value.team_role == "Innovator") {
        this.ranks.push(value.rankOrder);
        this.innovatorRank = value.rankOrder;
      }
      if (this.isRecommended) {
        this.hideRelationship = (this.relationshipRank == 5 || this.relationshipRank == 6) ? true : false;
        this.hideExternal = (this.externalRank == 5 || this.externalRank == 6) ? true : false;
        this.hideEntrepreneur = (this.entrepreneurRank == 5 || this.entrepreneurRank == 6) ? true : false;
        this.hideResults = (this.resultRank == 5 || this.resultRank == 6) ? true : false;
        this.hideStructured = (this.structuredRank == 5 || this.structuredRank == 6) ? true : false;
        this.hideInnovator = (this.innovatorRank == 5 || this.innovatorRank == 6) ? true : false;
      }
    });
  }

  applyHighestOrLowest() {
    this.loadCounter = +1;
    let parentScope = this;
    let highAnchorRoles = [];
    let lowAnchorRoles = [];
    this.description.filter(function (value) {
      if (value.anchor == 'High' && parentScope.isHighest) {
        highAnchorRoles.push(value.team_role);
      }
      if (value.anchor == 'Low' && parentScope.isLowest) {
        lowAnchorRoles.push(value.team_role);
      }
    });

    if (!highAnchorRoles.length && this.isHighest) {
      let maxRolePercentage = this.RankOrder.reduce((p, c) => p.rankOrder < c.rankOrder ? p : c);
      this.hideInnovator = (maxRolePercentage.team_role == 'Innovator') ? true : false;
      this.hideEntrepreneur = (maxRolePercentage.team_role == 'Entrepreneur') ? true : false;
      this.hideExternal = (maxRolePercentage.team_role == 'External') ? true : false;
      this.hideRelationship = (maxRolePercentage.team_role == 'Relationship') ? true : false;
      this.hideResults = (maxRolePercentage.team_role == 'Results') ? true : false;
      this.hideStructured = (maxRolePercentage.team_role == 'Structured') ? true : false;
    } else if (!lowAnchorRoles.length && this.isLowest) {
      let minRolePercentage = this.RankOrder.reduce((p, c) => p.rankOrder > c.rankOrder ? p : c);
      this.hideInnovator = (minRolePercentage.team_role == 'Innovator') ? true : false;
      this.hideEntrepreneur = (minRolePercentage.team_role == 'Entrepreneur') ? true : false;
      this.hideExternal = (minRolePercentage.team_role == 'External') ? true : false;
      this.hideRelationship = (minRolePercentage.team_role == 'Relationship') ? true : false;
      this.hideResults = (minRolePercentage.team_role == 'Results') ? true : false;
      this.hideStructured = (minRolePercentage.team_role == 'Structured') ? true : false;
    } else if (!this.isHighest && !this.isLowest) {
      this.hideInnovator = true;
      this.hideEntrepreneur = true;
      this.hideExternal = true;
      this.hideRelationship = true;
      this.hideResults = true;
      this.hideStructured = true;
    } else {
      this.hideInnovator = (highAnchorRoles.includes('Innovator') || lowAnchorRoles.includes('Innovator')) ? true : false;
      this.hideEntrepreneur = (highAnchorRoles.includes('Entrepreneur') || lowAnchorRoles.includes('Entrepreneur')) ? true : false;
      this.hideExternal = (highAnchorRoles.includes('External') || lowAnchorRoles.includes('External')) ? true : false;
      this.hideRelationship = (highAnchorRoles.includes('Relationship') || lowAnchorRoles.includes('Relationship')) ? true : false;
      this.hideResults = (highAnchorRoles.includes('Results') || lowAnchorRoles.includes('Results')) ? true : false;
      this.hideStructured = (highAnchorRoles.includes('Structured') || lowAnchorRoles.includes('Structured')) ? true : false;
    }
    this.loadCounter = -1;
  }


  openDetailsDialog(type) {
    let descriptionData = {
      des: this.description,
      type: type
    }

    const dialogRef = this.dialog.open(SharedCycleReportComponent, {
      width: '40vw',
      height: 'calc(100vh - 76px)',
      position: { top: '76px' },
      data: descriptionData
    });
  }
}