import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { TeamFeedbackDialogFormComponent } from '../form-dailog/team-feedback-dialog-form/team-feedback-dialog-form.component';
import { TeamdevelopmentService } from '../teamdevelopment.service';

@Component({
  selector: 'app-team-feeback',
  templateUrl: './team-feeback.component.html',
  styleUrls: ['./team-feeback.component.scss']
})
export class TeamFeebackComponent implements OnInit {
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
    private http: HttpClient,
    private dialog: MatDialog,
    private teamDevService: TeamdevelopmentService,
    private router: Router,
    private httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }

  ngOnChanges() { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.uuid = params.uuid;
      this.token = params.token
    });

    this.teamDevService.getStatusofFeedback(this.uuid).subscribe((res: any) => {
      if (res.is_advice == true) {
        this.getData();
        this.getCap();
      } else {
        this.router.navigate(['/notfound/'], { queryParams: { errMessage: 'You Do Not Have Permission To Perform This Action' } });
      }
    });
  }

  getData() {
    this.teamDevService.getfeedback(this.uuid).subscribe((res: any) => {
      res.fadResponse.capabilities.map(value => { value.capabilityName = value.label });
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

  checkEmpty(obj) {
    return _.isEmpty(obj);
  }

  openFeedback() {
    const dialogRef = this.dialog.open(TeamFeedbackDialogFormComponent, {
      width: '50vw',
      height: '100vh',
      position: { right: '0', top: '0' },
      data: {
        behaviour: this.allbehavior,
        outcome: this.alloutcome,
        // selectedBehaviour: this.data.selectedBehaviour,
        // selectedOutcome: this.data.selectedOutcome,
        uuid: this.uuid,
        token: this.token,
        // dateRange: this.dateRange,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.feedback = result.feedback;
        // this.stored = result.stored;
      }
    });
  }

  editFeedback() {
    const dialogRef = this.dialog.open(TeamFeedbackDialogFormComponent, {
      width: '50vw',
      height: '100vh',
      position: { right: '0', top: '0' },
      data: {
        isEdit: true,
        feedback: this.feedback,
        behaviour: this.allbehavior,
        outcome: this.alloutcome,
        // selectedBehaviour: this.data.selectedBehaviour,
        // selectedOutcome: this.data.selectedOutcome,
        uuid: this.uuid,
        token: this.token,
        // dateRange: this.dateRange,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.feedback = result.feedback;
        // this.stored = result.stored;
      }
    });
  }

}
