import { DataService } from 'src/app/design/service/data.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { DesignService } from '../design.service';
import { MatDialog } from '@angular/material/dialog';
import { TeamSprintSaveComponent } from '../Modal/team-sprint-save/team-sprint-save.component';
import { SprintServiceService } from '../../sprint-team/sprint-service.service';
import { Role } from 'src/app/auth/Role';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-team-dev-plan',
  templateUrl: './team-dev-plan.component.html',
  styleUrls: ['./team-dev-plan.component.scss']
})
export class TeamDevPlanComponent implements OnInit, OnChanges {
  data: any;
  sprint_id: number;
  capabilities = [];
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  userSprint: any;
  design = 'design';
  isLoading: boolean;
  fad: any;
  priority = [];
  crewMember = [];
  FadArray = []
  isEdit = true;
  teamId: string;
  activity;
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

  constructor(
    private dataService: DataService,
    private designService: DesignService,
    public dialog: MatDialog,
    private sprintService: SprintServiceService,
    private teamService: TeamService
  ) { }

  ngOnChanges() {
    this.getfad();
  }

  async ngOnInit() {

    await this.getSprintData();
    this.teamId = localStorage.getItem('selectedTeamId');

    this.getUserSprint();
    this.getSprintScrew();
    this.getfad();
    this.getAllData();
    this.getcap();
    this.getDashboardData();
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
  }


  finalEdit() {
    this.isEdit = false;
    this.dataService.nextMessage({ isEdit: true });
  }

  saveSprint() {
    this.isEdit = true;
    this.dataService.nextMessage({ isEdit: false });
  }

  shareSprint() {
    const dialogRef = this.dialog.open(TeamSprintSaveComponent, {
      width: '30vw',
      data: {}
    });
  }

  getcap() {
    this.designService.getCapabilities().subscribe((res: any) => {
      // this.capabilities = res.filter((o) => o.score < 2.57);
      this.capabilities = res.map((record, index) => {
        return {
          ...record,
          strategy: Math.round(record.strategyScore),
          style: Math.round(record.styleScore),
          icon: this.defaultIcons[record.capabilityName],
          rank: index + 1
        }
      });
      this.capabilities = this.capabilities.filter(o => o.rank < 4);
    });
  }

  getAllData() {
    this.designService.getAllSelected(this.sprint_id).subscribe((res: any) => {
      this.alloutcome = res.outcomeList.slice(0, 3);
      this.allbehavior = res.behaviourList.slice(0, 3);
      this.allaction = res.actionList.slice(0, 6);
    });
  }

  getfad() {
    this.designService.getFad().subscribe((res: any) => {
      this.fad = res;
      res.capabilities.map(value => { value.name = value.label })
      res.areas.map(value => { value.name = value.scale })

      this.FadArray = res.areas.concat(res.capabilities, res.roles);
      this.priority = this.FadArray.filter(p => p.isPriority == true);
    });
  }

  getUserSprint() {
    this.designService.getTeamSprint().subscribe((res) => {
      this.userSprint = res;
    });
  }

  getSprintScrew() {
    this.designService.getCrewMember(this.sprint_id).subscribe((res: any) => {
      this.crewMember = res;
    });
  }

  shareDesign() {
    this.designService.shareDesign(this.sprint_id).subscribe((res) => {
    });
  }

  async getSprintData() {
    try {
      const activeRole = localStorage.getItem('Role')

      if (activeRole == Role.TEAM_MEMBER) {
        this.teamId = localStorage.getItem('membertid')
      } else {
        this.teamId = localStorage.getItem('selectedTeamId')
      }
      const response: any = await this.sprintService.getSprintData(this.teamId).toPromise();
      if (response) {
        this.sprint_id = response.sprint_id;
      }

      return response;
    } catch (error) {
      return error;
    }
  }

  getDashboardData() {
    this.teamService.getTeamActivityData(this.teamId).subscribe((data: any) => {

      this.activity = data[0];

    }, err => { });
  }

  isSprintDurationChanged(e) {
    if (e) {
      this.getUserSprint();
    }
  }

}
