import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { CustomValidators } from 'ngx-custom-validators';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-dash-viewing-rights',
  templateUrl: './dash-viewing-rights.component.html',
  styleUrls: ['./dash-viewing-rights.component.scss']
})
export class DashViewingRightsComponent implements OnInit {
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
  crewPortfolioTrue: number[] = [];
  crewPortfolioFalse: number[] = [];
  vrsPlanTrue: number[] = [];
  vrsPlanFalse: number[] = [];
  vrsPortfolioTrue: number[] = [];
  vrsPortfolioFalse: number[] = [];
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
  portfolioArr: any = [];
  portfolioCrewArr: any = [];
  lsaData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService,
    private dataCheck: DataCheckService,
    public dialog: MatDialog,
    // public toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.getAssessmentTrigger();
    this.viewRightsForm = this.fb.group({
      invitee: this.fb.array([]),
    });

    this.allViewRightsForm = this.fb.group({
      invitee: this.fb.array([]),
    });

    this.crewForm = this.fb.group({
      crew: this.fb.array([this.createItemRow()]),
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
    this.getlsa();
  }

  getlsa() {
    this.http.get(`${environment.baseurl}/viewingrightlsa/get-lsa-data`).subscribe((res: any) => {
      this.lsaData = res.data
    })
  }

  lsaUserPlan(e, item) {
    if (e.target.checked == true) {
      item.isPlanAccess = true
    }
    else {
      item.isPlanAccess = false
    }

    let payload = {
      "lsa_user_id": item.lsa_id,
      "isPlanAccess": item.isPlanAccess
    }
    this.http.post(`${environment.baseurl}/viewingrightlsa/update-lsa-user-plan`, payload).subscribe((res: any) => {
      // this.toastr.success('Success', res.data, {
      //   timeOut: 3000,
      // });
    })
  }

  userPortfolio(e, item) {
    if (e.target.checked == true) {
      item.isPortfolioAccess = true
    }
    else {
      item.isPortfolioAccess = false
    }

    let payload = {
      "lsa_user_id": item.lsa_id,
      "isPortfolioAccess": item.isPortfolioAccess
    }
    this.http.post(`${environment.baseurl}/viewingrightlsa/update-lsa-user-portfolio`, payload).subscribe((res: any) => {
      // this.toastr.success('Success', res.data, {
      //   timeOut: 3000,
      // });
    })
  }

  userReport(e, item) {
    if (e.target.checked == true) {
      item.isReportAccess = true
    }
    else {
      item.isReportAccess = false
    }

    let payload = {
      "lsa_user_id": item.lsa_id,
      "isReportAccess": item.isReportAccess
    }
    this.http.post(`${environment.baseurl}/viewingrightlsa/update-lsa-user-report`, payload).subscribe((res: any) => {
      // this.toastr.success('Success', res.data, {
      //   timeOut: 3000,
      // });
    })
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

        /* for portfolio */
        this.crewPortfolioTrue = this.crews
          .filter((o) => o.isAccessGivenPortfolio === true)
          .map((o) => o.id);
        this.crewPortfolioFalse = this.crews
          .filter((o) => o.isAccessGivenPortfolio === false)
          .map((o) => o.id);

        // this.crewForm = this.fb.group({
        //   crew: this.fb.array([this.createItemRow()]),
        // });
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

        /* for portfolio */
        this.vrsPortfolioTrue = this.vrs
          .filter((o) => o.isAccessGivenPortfolio === true)
          .map((o) => o.id);
        this.vrsPortfolioFalse = this.vrs
          .filter((o) => o.isAccessGivenPortfolio === false)
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

  onToggle(data) {
    /* format data as per requirement */
    const formatedData = {
      crewId: data.id,
      plan: data.plan,
      portfolio: data.portfolio,
      report: data.report
    };

    let tempArr = [];
    if (this.portfolioArr.length > 0) {

      for (let [index, folioItem] of this.portfolioArr.entries()) {

        if (folioItem.crewId == null) {

          this.portfolioArr.splice(index, 1);
          tempArr.push(formatedData);
          break;
        }

        if (folioItem.crewId == formatedData.crewId) {
          this.portfolioArr[index] = formatedData;
        }
        else {
          tempArr.push(formatedData);
        }
      }

      this.portfolioArr = [...this.portfolioArr, ...tempArr];
    }
    else {
      this.portfolioArr.push(formatedData);
    }

    /*  make unique array */
    this.portfolioArr = this.portfolioArr.filter((value, index, self) => self.indexOf(value) === index);
  }

  onCrewToggle(data) {
    this.addUserButton = false;
    const formatedData = {
      crewId: data.id.value,
      plan: data.plan.value,
      portfolio: data.portfolio.value,
      report: data.report.value
    };

    let tempArr = [];
    if (this.portfolioCrewArr.length > 0) {

      for (let [index, folioItem] of this.portfolioCrewArr.entries()) {

        if (folioItem.crewId == formatedData.crewId) {

          this.portfolioCrewArr[index] = formatedData;
        }
        else {

          tempArr.push(formatedData);
        }
      }
      this.portfolioCrewArr = [...this.portfolioCrewArr, ...tempArr];
    }
    else {
      this.portfolioCrewArr.push(formatedData);
    }
    /*  make unique array */
    this.portfolioCrewArr = this.portfolioCrewArr.filter((value, index, self) => self.indexOf(value) === index);
  }

  createItemRow() {
    return this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null, Validators.required),
      email: this.fb.control(null, [
        Validators.required,
        CustomValidators.email,
      ]),
      // portfolio: this.fb.control(false),
      portfolio: this.fb.control(true, Validators.required),
      report: this.fb.control(false),
      role: this.fb.control('manager', Validators.required),
      plan: this.fb.control(true, Validators.required),
      // isFeedbackGoalsNBehaviour: this.fb.control(true, Validators.required),
    });
  }
  addVrToForm(crew) {
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
      // portfolio: this.fb.control(false),
      portfolio: this.fb.control(crew.isAccessGivenPortfolio, Validators.required),
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
      // portfolio: this.fb.control(false),
      portfolio: this.fb.control(crew.isAccessGivenPortfolio, Validators.required),
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
    this.configService.setConfig({ isLoader: true });
    this.addUserButton = true;
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
    try {
      if (
        this.viewRightsForm.valid && payload &&
        this.changeCrewFinal.length === 0 &&
        this.changesVrsFinal.length === 0
      ) {
        this.loadCounter += 1;
        this.http.post(`${environment.baseurl}/viewingright/add-vr`, payload)
          .subscribe((res: any) => {
            if (res.status != 200) {
              this.loadCounter = 0;
              const dialogRef = this.dialog.open(ModalDialogComponent, {
                width: '350px',
                data: { message: res.message }
              });
            }
            this.loadCounter = 0;
            this.viewRightsForm = this.fb.group({
              invitee: this.fb.array([]),
            }, error => {
              this.loadCounter = 0;
              console.log(error);
            });
            this.changeCrewFinal = [];
            this.changesVrsFinal = [];
            this.getAssessmentTrigger();
            this.addUserButton = true;
          }, error => {
            this.loadCounter = 0;
            const dialogRef = this.dialog.open(ModalDialogComponent, {
              width: '350px',
              data: { message: error.message }
            });

          });
      } else if (this.viewRightsForm.valid && payload) {
        this.loadCounter += 1;
        this.http.post(`${environment.baseurl}/viewingright/add-vr`, payload)
          .subscribe((res: any) => {
            this.loadCounter = 0;
            if (res.status != 200) {
              this.loadCounter = 0;
              const dialogRef = this.dialog.open(ModalDialogComponent, {
                width: '350px',
                data: { message: res.message }
              });
            }
            this.viewRightsForm = this.fb.group({
              invitee: this.fb.array([]),
            });

            // this.http
            //   .patch(
            //     `${environment.baseurl}/viewingright/viewing-rights`,
            //     // this.changesVrsFinal
            //     this.portfolioArr
            //   )
            //   .subscribe((res1: any) => {
                this.http
                  .patch(
                    `${environment.baseurl}/sprintcrew/viewing-rights`,
                    // this.changeCrewFinal
                    this.portfolioCrewArr
                  )
                  .subscribe((res2: any) => {
                    this.loadCounter -= 1;
                    this.changeCrewFinal = [];
                    this.changesVrsFinal = [];
                    this.getAssessmentTrigger();
                  });
              // });
            this.addUserButton = true;
          }, error => {
            this.loadCounter = 0;
            const dialogRef = this.dialog.open(ModalDialogComponent, {
              width: '350px',
              data: { message: error.message }
            });
          });

      } else {
        // this.http
        //   .patch(
        //     `${environment.baseurl}/viewingright/viewing-rights`,
        //     // this.changesVrsFinal
        //     this.portfolioArr
        //   )
        //   .subscribe((res1: any) => {
            this.http
              .patch(
                `${environment.baseurl}/sprintcrew/viewing-rights`,
                // this.changeCrewFinal
                this.portfolioCrewArr
              )
              .subscribe((res2: any) => {
                this.loadCounter -= 1;
                this.changeCrewFinal = [];
                this.changesVrsFinal = [];
                this.getAssessmentTrigger();
              });
          // });
      }
    }
    catch (error) {
      this.loadCounter = 0;
      console.log(error);
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
