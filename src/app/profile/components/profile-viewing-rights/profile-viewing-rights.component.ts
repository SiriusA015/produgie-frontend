import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../../../shared/service/config.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/design/service/data.service';
import { CustomValidators } from 'ngx-custom-validators';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile-viewing-rights',
  templateUrl: './profile-viewing-rights.component.html',
  styleUrls: ['./profile-viewing-rights.component.scss'],
})
export class ProfileViewingRightsComponent implements OnInit {
  addUserButton = true;
  loadCounter = 0;
  message: any;
  allfft = false;
  allfeedback = false;
  userId = 1;
  clientId = 1;
  userSprintId;
  sprintId;
  assessmentId;
  userSprint;
  deleteIds = [];
  crewPlanTrue: number[] = [];
  crewPlanFalse: number[] = [];
  vrsPlanTrue: number[] = [];
  vrsPlanFalse: number[] = [];
  changesVrsFinal = [];
  changeCrewFinal = [];
  crew = {
    name: localStorage.getItem('userName'),
    role: 'Self',
    image: '/assets/icons/user-1.svg',
    email: localStorage.getItem('email'),
    fft: true,
    feedback: true,
  };
  picture = 'avatar_10';
  viewRightsForm: FormGroup;
  viewRightsArray: FormArray;
  allViewRightsForm: FormGroup;
  allViewRightsArray: FormArray;
  crewForm: FormGroup;
  sprintcrew: FormArray;
  roleArray = {
    manager: 'Manager',
    mentor: 'Mentor',
    peer: 'Peer',
    team: 'Team',
    customer: 'Customer',
    coach: 'Coach',
    other: 'Other',
  };
  crews: any[] = [];
  vrs: any[] = [];
  triggerData: any;
  reportGenerated: any;
  designComplete: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService,
    private dataCheck: DataCheckService
  ) {}

  ngOnInit(): void {
    this.getAssessmentTrigger();
    this.viewRightsForm = this.fb.group({
      invitee: this.fb.array([]),
    });
  }
  getAssessmentTrigger() {
    this.configService.setConfig({ isLoader: true });
    this.dataCheck.getAssessmentTrigger().subscribe(
      (res: any) => {
        if (!res.isAgree) {
          this.router.navigate(['/auth/policy-consent']);
        }
        this.triggerData = res.data;
        // this.reportGenerated = this.triggerData.reportGenerated;
        this.designComplete = this.triggerData.isDesignComplete;
        if (this.designComplete) {
          this.configService.setConfig({ isLoader: false });
          this.picture = localStorage.getItem('picture');
          this.configService.setConfig({ isLoader: true });
          // this.route.params.subscribe((params) => {
          //   this.sprintId = params.id;
          // });
          this.crewForm = this.fb.group({
            crew: this.fb.array([this.createItemRow()]),
          });
          this.allViewRightsForm = this.fb.group({
            invitee: this.fb.array([]),
          });
          this.dataService.sharedMessage.subscribe(
            (message) => (this.message = message)
          );
          this.getSelectedCrew();
        } else {
          this.configService.setConfig({ isLoader: false });
        }
      },
      (err) => console.error(err)
    );
  }
  getSelectedCrew() {
    this.crews = [];
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${environment.baseurl}/sprintcrew/get-sel`).subscribe(
      (res2: any) => {
        this.crews = res2.data;
        this.crewPlanTrue = this.crews
          .filter((o) => o.isAccessGivenDevelopmentDashboard === true)
          .map((o) => o.id);
        this.crewPlanFalse = this.crews
          .filter((o) => o.isAccessGivenDevelopmentDashboard === false)
          .map((o) => o.id);
        // this.crewForm = this.fb.group({
        //   crew: this.fb.array([this.createItemRow()]),
        // });
        console.log(this.crews);
        // (this.crewForm.get('crew') as FormArray).clear();
        res2.data.forEach((o, i) => {
          this.sprintcrew = this.crewForm.get('crew') as FormArray;
          this.sprintcrew.push(this.addCrewToForm(o));
          // this.changeToFalse(i + 1);
        });
        if (res2.data.length > 0) {
          this.removeItemField(0);
        }
        this.getViewingRights();
        // this.configService.setConfig({ isLoader: false });
      },
      (err2) => {
        console.log(err2);
      }
    );
  }
  getViewingRights() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${environment.baseurl}/viewingright/get`).subscribe(
      (res2: any) => {
        this.vrs = res2.data;
        this.vrsPlanTrue = this.vrs
          .filter((o) => o.isAccessGivenDevelopmentDashboard === true)
          .map((o) => o.id);
        this.vrsPlanFalse = this.vrs
          .filter((o) => o.isAccessGivenDevelopmentDashboard === false)
          .map((o) => o.id);
        // this.crewForm = this.fb.group({
        //   crew: this.fb.array([this.createItemRow()]),
        // });
        (this.allViewRightsForm.controls['invitee'] as FormArray).clear();
        res2.data.forEach((o, i) => {
          this.allViewRightsArray = this.allViewRightsForm.get(
            'invitee'
          ) as FormArray;
          this.allViewRightsArray.push(this.addVrToForm(o));
          // this.changeToFalse(i + 1);
        });
        this.configService.setConfig({ isLoader: false });
      },
      (err2) => {
        console.log(err2);
      }
    );
  }
  onPlanChange() {
    const payloadvrs = this.allViewRightsForm.getRawValue().invitee;
    const payloadcrew = this.crewForm.getRawValue().crew;
    const allVrs = {
      true: payloadvrs.filter((o) => o.plan).map((o) => o.id),
      false: payloadvrs.filter((o) => !o.plan).map((o) => o.id),
    };
    const allVrsTrue = _.union(this.vrsPlanTrue, allVrs.true);
    const allVrsFalse = _.union(this.vrsPlanFalse, allVrs.false);
    const changesVrsTF = _.differenceWith(allVrsTrue, allVrs.true, _.isEqual);
    const changesVrsFT = _.differenceWith(allVrsFalse, allVrs.false, _.isEqual);
    this.changesVrsFinal = [
      ...changesVrsTF.map((o) => {
        return { crewId: o, plan: false, portfolio: false, report: false };
      }),
      ...changesVrsFT.map((o) => {
        return { crewId: o, plan: true, portfolio: false, report: false };
      }),
    ];

    const allCrews = {
      true: payloadcrew.filter((o) => o.plan).map((o) => o.id),
      false: payloadcrew.filter((o) => !o.plan).map((o) => o.id),
    };
    const allCrewTrue = _.union(this.crewPlanTrue, allCrews.true);
    const allCrewFalse = _.union(this.crewPlanFalse, allCrews.false);
    const changeCrewTF = _.differenceWith(
      allCrewTrue,
      allCrews.true,
      _.isEqual
    );
    const changeCrewFT = _.differenceWith(
      allCrewFalse,
      allCrews.false,
      _.isEqual
    );
    this.changeCrewFinal = [
      ...changeCrewTF.map((o) => {
        return { crewId: o, plan: false, portfolio: false, report: false };
      }),
      ...changeCrewFT.map((o) => {
        return { crewId: o, plan: true, portfolio: false, report: false };
      }),
    ];
  }
  createItemRow() {
    return this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null, Validators.required),
      email: this.fb.control(null, [
        Validators.required,
        CustomValidators.email,
      ]),
      portfolio: this.fb.control(false),
      report: this.fb.control(false),
      role: this.fb.control('manager', Validators.required),
      plan: this.fb.control(true, Validators.required),
      // isFeedbackGoalsNBehaviour: this.fb.control(true, Validators.required),
    });
  }
  addVrToForm(crew) {
    console.log(crew);
    let role = '';
    if (crew.isManager) {
      role = 'Manager';
    } else if (crew.isMentor) {
      role = 'Mentor';
    } else if (crew.isPeerOthers) {
      role = 'Peer';
    } else if (crew.isTeam) {
      role = 'Team';
    } else if (crew.isCustomer) {
      role = 'Customer';
    } else if (crew.isCoach) {
      role = 'Coach';
    } else {
      role = 'Other';
    }
    return this.fb.group({
      id: this.fb.control(crew.id),
      name: this.fb.control(crew.name, Validators.required),
      email: this.fb.control(crew.email, [
        Validators.required,
        CustomValidators.email,
      ]),
      role: this.fb.control(role, Validators.required),
      // isFastForward: this.fb.control(crew.isFastForward, Validators.required),
      portfolio: this.fb.control(false),
      report: this.fb.control(false),
      plan: this.fb.control(
        crew.isAccessGivenDevelopmentDashboard,
        Validators.required
      ),
      // isFeedbackGoalsNBehaviour: this.fb.control(
      //   crew.isFeedbackGoalsNBehaviour,
      //   Validators.required
      // ),
    });
  }
  addCrewToForm(crew) {
    console.log(crew);
    let role = '';
    if (crew.isManager) {
      role = 'Manager';
    } else if (crew.isMentor) {
      role = 'Mentor';
    } else if (crew.isPeerOthers) {
      role = 'Peer';
    } else if (crew.isTeam) {
      role = 'Team';
    } else if (crew.isCustomer) {
      role = 'Customer';
    } else if (crew.isCoach) {
      role = 'Coach';
    } else {
      role = 'Other';
    }
    return this.fb.group({
      id: this.fb.control(crew.id),
      name: this.fb.control(crew.name, Validators.required),
      email: this.fb.control(crew.email, [
        Validators.required,
        CustomValidators.email,
      ]),
      role: this.fb.control(role, Validators.required),
      // isFastForward: this.fb.control(crew.isFastForward, Validators.required),
      portfolio: this.fb.control(false),
      report: this.fb.control(false),
      plan: this.fb.control(
        crew.isAccessGivenDevelopmentDashboard,
        Validators.required
      ),
      // isFeedbackGoalsNBehaviour: this.fb.control(
      //   crew.isFeedbackGoalsNBehaviour,
      //   Validators.required
      // ),
    });
  }
  addItemField() {
    this.viewRightsArray = this.viewRightsForm.get('invitee') as FormArray;
    this.viewRightsArray.push(this.createItemRow());
    this.addUserButton = false;
  }
  removeItemFieldInvitee(index: number) {
    this.viewRightsArray = this.viewRightsForm.get('invitee') as FormArray;

    this.viewRightsArray.removeAt(index);
    this.addUserButton = true;
    // if (this.viewRightsArray.length === 0) {
    //   this.viewRightsArray.push(this.createItemRow());
    // }
  }
  removeItemFieldVr(index: number) {
    this.allViewRightsArray = this.allViewRightsForm.get(
      'invitee'
    ) as FormArray;

    this.allViewRightsArray.removeAt(index);
    if (this.allViewRightsArray.length === 0) {
      this.allViewRightsArray.push(this.createItemRow());
    }
  }
  removeItemField(index: number) {
    this.sprintcrew = this.crewForm.get('crew') as FormArray;

    this.sprintcrew.removeAt(index);
    if (this.sprintcrew.length === 0) {
      this.sprintcrew.push(this.createItemRow());
    }
  }
  storeViewingRights() {
    // console.log(this.crewForm.getRawValue());
    this.configService.setConfig({ isLoader: true });
    const payload = this.viewRightsForm.getRawValue().invitee[0];
    const payloadvrs = this.allViewRightsForm.getRawValue().invitee;
    const payloadcrew = this.crewForm.getRawValue().crew;
    const allVrs = {
      true: payloadvrs.filter((o) => o.plan).map((o) => o.id),
      false: payloadvrs.filter((o) => !o.plan).map((o) => o.id),
    };
    const allVrsTrue = _.union(this.vrsPlanTrue, allVrs.true);
    const allVrsFalse = _.union(this.vrsPlanFalse, allVrs.false);
    const changesVrsTF = _.differenceWith(allVrsTrue, allVrs.true, _.isEqual);
    const changesVrsFT = _.differenceWith(allVrsFalse, allVrs.false, _.isEqual);
    this.changesVrsFinal = [
      ...changesVrsTF.map((o) => {
        return { crewId: o, plan: false, portfolio: false, report: false };
      }),
      ...changesVrsFT.map((o) => {
        return { crewId: o, plan: true, portfolio: false, report: false };
      }),
    ];

    const allCrews = {
      true: payloadcrew.filter((o) => o.plan).map((o) => o.id),
      false: payloadcrew.filter((o) => !o.plan).map((o) => o.id),
    };
    const allCrewTrue = _.union(this.crewPlanTrue, allCrews.true);
    const allCrewFalse = _.union(this.crewPlanFalse, allCrews.false);
    const changeCrewTF = _.differenceWith(
      allCrewTrue,
      allCrews.true,
      _.isEqual
    );
    const changeCrewFT = _.differenceWith(
      allCrewFalse,
      allCrews.false,
      _.isEqual
    );
    this.changeCrewFinal = [
      ...changeCrewTF.map((o) => {
        return { crewId: o, plan: false, portfolio: false, report: false };
      }),
      ...changeCrewFT.map((o) => {
        return { crewId: o, plan: true, portfolio: false, report: false };
      }),
    ];
    if (
      this.viewRightsForm.valid && payload &&
      this.changeCrewFinal.length === 0 &&
      this.changesVrsFinal.length === 0
    ) {
      this.loadCounter += 1;
      this.http
        .post(`${environment.baseurl}/viewingright/add-vr`, payload)
        .subscribe((res: any) => {
          this.loadCounter -= 1;
          this.viewRightsForm = this.fb.group({
            invitee: this.fb.array([]),
          });
          this.changeCrewFinal = [];
          this.changesVrsFinal = [];
          this.getAssessmentTrigger();
          this.addUserButton = true;
        });
    } else if (this.viewRightsForm.valid && payload) {
      this.loadCounter += 1;
      this.http
        .post(`${environment.baseurl}/viewingright/add-vr`, payload)
        .subscribe((res: any) => {
          this.viewRightsForm = this.fb.group({
            invitee: this.fb.array([]),
          });
          this.http
            .patch(
              `${environment.baseurl}/viewingright/viewing-rights`,
              this.changesVrsFinal
            )
            .subscribe((res1: any) => {
              this.http
                .patch(
                  `${environment.baseurl}/sprintcrew/viewing-rights`,
                  this.changeCrewFinal
                )
                .subscribe((res2: any) => {
                  this.loadCounter -= 1;
                  this.changeCrewFinal = [];
                  this.changesVrsFinal = [];
                  this.getAssessmentTrigger();
                });
            });
          this.addUserButton = true;
        });
    } else {
      this.http
        .patch(
          `${environment.baseurl}/viewingright/viewing-rights`,
          this.changesVrsFinal
        )
        .subscribe((res1: any) => {
          this.http
            .patch(
              `${environment.baseurl}/sprintcrew/viewing-rights`,
              this.changeCrewFinal
            )
            .subscribe((res2: any) => {
              this.loadCounter -= 1;
              this.changeCrewFinal = [];
              this.changesVrsFinal = [];
              this.getAssessmentTrigger();
            });
        });
    }
  }
  getRole(crew) {
    if (crew.isManager) {
      return 'manager';
    } else if (crew.isMentor) {
      return 'mentor';
    } else if (crew.isPeerOthers) {
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
}
