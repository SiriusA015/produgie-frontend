import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { TeamdevelopmentService } from 'src/app/Team-Development/teamdevelopment.service'
import { TeamAdviceDialogFormComponent } from '../form-dailog/team-advice-dialog-form/team-advice-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-team-advice',
  templateUrl: './team-advice.component.html',
  styleUrls: ['./team-advice.component.scss']
})
export class TeamAdviceComponent implements OnInit {
  username: string;
  uuid: any;
  token: any;
  isLoading: boolean;
  fad: any;
  priority = [];
  crewMember = [];
  FadArray = []
  capabilities: any;
  alloutcome: any;
  allbehavior: any;
  allaction: any;
  userSprint: any;
  feedback = {};
  advice = {};
  stored = false;
  design = 'design';
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

  constructor(private route: ActivatedRoute,
    private teamDevService: TeamdevelopmentService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.uuid = params.uuid;
    });

    this.teamDevService.getStatusofAdvice(this.uuid).subscribe((res: any) => {
      if (res.is_advice == true) {
        this.getData();
        this.getCap();
      } else {
        this.router.navigate(['/notfound/'], { queryParams: { errMessage: 'You Do Not Have Permission To Perform This Action' } });
      }
    });
  }


  getData() {
    this.teamDevService.getadvice(this.uuid).subscribe((res: any) => {
      res.fadResponse.capabilities.map(value => { value.capabilityName = value.label });
      res.fadResponse.capabilities.map(value => { value.name = value.label });
      res.fadResponse.areas.map(value => { value.name = value.scale });
      this.FadArray = res.fadResponse.areas.concat(res.fadResponse.capabilities, res.fadResponse.roles);
      this.priority = this.FadArray.filter(p => p.isPriority == true);
      this.userSprint = res.currentSprintResponse;
      this.crewMember = res.allSprintCrewMemeber;
      this.allaction = res.fetchSelectedActionData.actionList.slice(0, 6)
      this.alloutcome = res.fetchSelectedActionData.outcomeList.slice(0, 3)
      this.allbehavior = res.fetchSelectedActionData.behaviourList.slice(0, 3)
    });
  }

  getCap() {
    this.teamDevService.getCapabilities(this.uuid).subscribe((res: any) => {
      this.capabilities = res.map((record, index) => {
        return {
          ...record,
          icon: this.defaultIcons[record.capabilityName],
          rank: index + 1
        }
      });
      this.capabilities = this.capabilities.filter(o => o.rank < 4);
    });
  }

  checkEmpty(advice) {
    return _.isEmpty(advice);
  }

  openAdvice() {
    const dialogRef = this.dialog.open(TeamAdviceDialogFormComponent, {
      width: '40vw',
      height: '100vh',
      position: { right: '0', top: '0' },
      data: { isEdit: false, advice: null, uuid: this.uuid, token: this.token },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.advice = result.advice;
        this.stored = result.stored;
      }
    });
  }

  editAdvice() {
    const dialogRef = this.dialog.open(TeamAdviceDialogFormComponent, {
      width: '40vw',
      height: '100vh',
      position: { right: '0', top: '0' },
      data: {
        isEdit: true,
        advice: this.advice,
        uuid: this.uuid,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.advice = result.advice;
        this.stored = result.stored;
      }
    });
  }

}
