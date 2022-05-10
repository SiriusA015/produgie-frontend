import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DataCheckService } from './../../../shared/service/dataCheck.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DetailedReportDialogComponent } from '../modals/detailed-report-dialog/detailed-report-dialog.component';
import { SelectJobRoleDialogComponent } from '../modals/select-job-role-dialog/select-job-role-dialog.component';
import { HttpService } from '../../service/http.service';
import { SNACKBAR_MESSAGE } from 'src/app/shared/models/constants';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {
  grayOverlay = true;
  currentRole = [];
  futureRole = [];
  selectedRoleDemands = [];
  selectedJobRoles = [];
  isStyleDone: boolean = false;
  isStrategyDone: boolean = false;
  isStyleComplete: boolean = false;
  isStrategyComplete: boolean = false;
  reportGenerated: boolean = false;
  triggerData: any;
  jobroleAdded: boolean = false;
  isLoading: boolean = false;
  strategyLink: any;
  styleLink: any;
  loaderBar: boolean = false;
  isJobRoleAdded: boolean = false;
  picture = 'avatar_10';
  capabilities = [];
  loadCounter = 0;
  glaSurveyCompleted: boolean = false;
  CheckboxValueCheck: any;
  data: void;
  value: any;
  valuedata: boolean;
  isAllow: boolean;
  isShowextendGlaSurvey: boolean;
  isShownominee: boolean;
  gla_360_survey_completed: any;
  is_gla_360_due: any;
  gla360completed: boolean = false;
  gla360incomplete: boolean = false;
  gla360expired: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    public configService: ConfigService,
    private dataCheck: DataCheckService,
    private router: Router,
    private matDialog: MatDialog,
    private httpService: HttpService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.picture = localStorage.getItem('picture');
    this.getAssessmentTrigger();
    this.checkAllStatus();
    this.getCapabilities();
    this.getJobs();


    this.http
      .get(`${environment.baseurl}/glaresponse/get-gla-response-viewing-rights`)
      .subscribe((res) => {
        if (res['data'] == true) {
          this.isAllow = true;
        } else {
          this.isAllow = false;
        }
      });
  }
  getAssessmentTrigger() {
    this.loadCounter += 1;

    this.dataCheck.getAssessmentTrigger().subscribe(
      (res: any) => {
        if (!res.isAgree) {
          this.router.navigate(['/auth/policy-consent']);
          return;
        }
        this.triggerData = res.data;
        this.reportGenerated = this.triggerData.reportGenerated;
        if (!this.isStyleDone && !this.isStrategyDone) {
          this.jobroleAdded = false;
        }
        this.loadCounter -= 1;
      },
      (err) => {
        console.error(err);
        this.loadCounter -= 1;
      }
    );
  }

  checkAllStatus() {
    this.loadCounter += 1;
    this.httpService.getAllStatus().subscribe(
      (res: any) => {
        this.jobroleAdded = res.message['role_challenges_completed'];
        this.isStyleDone = res.message['style_survey_completed'];
        this.isStrategyDone = res.message['stretegy_survey_completed'];
        this.isStrategyComplete = res.message['stretegy_survey_completed'];
        this.glaSurveyCompleted = res.message['gla_survey_completed'];
        this.gla_360_survey_completed = res.message['gla_360_survey_completed'];
        this.is_gla_360_due = res.message['is_gla_360_due'];
        this.loadCounter -= 1;
        console.log(this.gla_360_survey_completed,"test status");
        localStorage.setItem('gla_survey_completed',res.message['gla_survey_completed']);

       if (this.gla_360_survey_completed) {
          this.gla360completed = true ;
          this.gla360expired = false;
          this.gla360incomplete = false;
        } else {
          if (this.is_gla_360_due) {
            this.gla360completed = false;
            this.gla360expired = true;
            this.gla360incomplete = false;
          } else {
            this.gla360completed = false;
            this.gla360expired = false;
            this.gla360incomplete = true;
            }
        }
      },
      (err) => {
        console.error(err);
        this.loadCounter -= 1;
      }
    );
  }

  // Extend survey gla360

  // gotonomiee() {
  //   if (this.gla_360_survey_completed) {
  //     // this.router.navigate(['gl360/nominee']);
  //     this.gla360completed = true;
  //     this.gla360expired = false;
  //     this.gla360incomplete = false;
  //   } else {
  //     if (this.is_gla_360_due==true) {
  //       this.gla360completed = false;
  //       this.gla360expired = true;
  //       this.gla360incomplete = false;
  //     } else {
  //       this.gla360completed = false;
  //       this.gla360expired = false;
  //       this.gla360incomplete = true;
  //       //
  //     }
  //   }
  // }

  gotonomieetest(){
    this.router.navigate(['gl360/nominee']);
  }

  extendsurvey() {
    this.http
      .get(`${environment.baseurl}/nominee/extend-survey`)
      .subscribe((res) => {
       });
  }

  getCapabilities() {
    this.loadCounter += 1;
    this.http
      .get(`${environment.baseurl}/nomineeresponsescore/capability-rank`)
      .subscribe(
        (res: any) => {
          this.capabilities = res.data;
          this.loadCounter -= 1;
        },
        (err) => {
          console.error(err);
          this.loadCounter -= 1;
        }
      );
  }
  getJobs() {
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/jobrole/get-jobs`).subscribe(
      (res: any) => {
        res.data.job.reverse();
        this.currentRole = res.data.job;
        this.futureRole = res.data.job;
        const selectedJobRoles = res.data.selectedJob;
        if (selectedJobRoles.length > 0) {
          this.selectedRoleDemands = _.sortBy(
            selectedJobRoles,
            (o) => o.rank
          ).map((o) => o.jobRoleId);
          this.jobroleAdded = true;
          if (this.isStyleDone) {
            this.loadCounter += 1;
            this.dataCheck.getAssessmentTrigger().subscribe(
              (res1: any) => {
                if (!res1.isAgree) {
                  this.router.navigate(['/auth/policy-consent']);
                }
                this.triggerData = res1.data;
                this.reportGenerated = this.triggerData.reportGenerated;
                this.isLoading = false;
                this.jobroleAdded = true;
                this.loaderBar = false;
                this.loadCounter -= 1;
              },
              (err) => {
                console.error(err);
                this.loaderBar = false;
                this.loadCounter -= 1;
              }
            );
          }
        }
        this.loadCounter -= 1;
      },
      (err) => {
        console.error(err);
        this.loadCounter -= 1;
      }
    );
  }
  selectRoleDemands(id) {
    if (this.jobroleAdded) {
      return;
    }
    if (this.selectedRoleDemands.length === 3) {
      if (this.selectedRoleDemands.includes(id)) {
        const index = _.indexOf(this.selectedRoleDemands, id);
        this.selectedRoleDemands.splice(index, 1);
      }
    } else {
      if (this.selectedRoleDemands.includes(id)) {
        const index = _.indexOf(this.selectedRoleDemands, id);
        this.selectedRoleDemands.splice(index, 1);
      } else {
        this.selectedRoleDemands.push(id);
      }
    }
  }

  getIndex(array: any, item: number) {
    return _.indexOf(array, item);
  }
  checkJobRole() {
    if (this.selectedRoleDemands.length < 3) {
      this.openSnackBar('Please select 3 role demands to continue');
    }
  }
  openSnackBar(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 2500,
    });
  }
  refreshPage() {
    this.getAssessmentTrigger();
  }
  gotoSnapshot(type) {
    if (this.reportGenerated) {
      this.router.navigate(['/explore/aboutgrowthleaders'], {
        state: { example: type },
      });
    } else {
      this.openSnackBar('please Complete ur gla first');
    }
  }

  handleSelected(event) {
    this.CheckboxValueCheck = event.target.checked;
    this.datapass(this.CheckboxValueCheck);
  }

  datapass(data: any) {
    //  send data to response
    data = {
      canView: this.CheckboxValueCheck,
    };

    this.http
      .post(
        `${environment.baseurl}/glaresponse/set-gla-response-viewing-rights`,
        data
      )
      .subscribe((res) => {
        this.configService.setConfig({ isLoader: true });

        this.configService.setConfig({ isLoader: false });
      });
  }

  goToGLReport() {
    if (this.capabilities.length > 0) {
      this.openSnackBar('please Complete ur nomiee first');
    } else {
      this.router.navigate(['/gl360/report']);
    }
  }
  openSelectDialog() {
    const dialogRef = this.matDialog.open(SelectJobRoleDialogComponent, {
      width: '80vw',
      maxWidth: '80vw',
      height: '95vh',
      maxHeight: '95vh',
      panelClass: 'roleChallenges-dialog',
      data: {
        roles: this.currentRole,
        selected: this.selectedRoleDemands,
        isAdded: this.jobroleAdded,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.isLoading = true;
        if (result.data.length === 3) {
          const payload = { job: result.data };
          this.http
            .post(`${environment.baseurl}/selectedjobrole/add-by-rank`, payload)
            .subscribe(
              (res: any) => {
                // this.getStyleLink();
                this.checkAllStatus();
              },
              (err) => {
                console.error(err);
                this.openSnackBar(SNACKBAR_MESSAGE.API_FAILED);
              }
            );
        }
      }
    });
  }

  // first popup
  openStyleStrategyDialog() {
    // this.loadCounter += 1;
    this.httpService.getAllStatus().subscribe(
      (res: any) => {
        if (res.message['role_challenges_completed'] == false) {
          this._snackBar.open('Please Select Role Challenges First', '', {
            duration: 3000,
          });
          return;
        } else {
          this.loadCounter += 1;
          if (res.message['style_survey_completed']) {
            if (res.message['stretegy_survey_completed']) {
              this.openResearch();
            } else {
              this.openStretegySurvey();
            }
          } else if (res.message['role_updated']) {
            this.openStyleSurvey();
          } else {
            this.openStyleInitial();
          }
          this.loadCounter -= 1;
        }
      },
      (err) => {
        console.error(err);
        this.loadCounter -= 1;
      }
    );
  }

  openStyleInitial() {
    const dialogRef = this.matDialog.open(SelectJobRoleDialogComponent, {
      width: '540px',
      maxWidth: '540px',
      height: '90vh',
      maxHeight: '90vh',
      panelClass: 'info-dialog',
      data: { isInfoDiv: true },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        // second popup level select
        this.loadCounter += 1;
        this.http.get(`${environment.baseurl}/question/get-roles`).subscribe(
          (roleResult: any) => {
            this.loadCounter -= 1;
            const dialogRef = this.matDialog.open(
              SelectJobRoleDialogComponent,
              {
                width: '70vw',
                maxWidth: '80vw',
                height: '80vh',
                maxHeight: '90vh',
                panelClass: 'level-dialog',
                data: {
                  isCurrentRoleLevel: true,
                  roleData: roleResult.message,
                },
                disableClose: true,
              }
            );
            dialogRef.afterClosed().subscribe((result) => {
              if (!result.isCancel) {
                this.openStyleSurvey();
              }
            });
          },
          (err) => {
            console.error(err), (this.loadCounter -= 1);
          }
        );
      }
    });
  }

  openStyleSurvey() {
    this.loadCounter += 1;
    this.http
      .get(
        `${environment.baseurl}/question/get-questions?type=Style&page=1&limit=10`
      )
      .subscribe(
        (res: any) => {
          // third popup mcq
          this.loadCounter -= 1;
          const dialogRef = this.matDialog.open(SelectJobRoleDialogComponent, {
            width: '100vw',
            maxWidth: '100vw',
            height: '100vh',
            maxHeight: '100vh',
            panelClass: 'level-dialog',
            data: {
              isMCQ: true,
              questionData: res.message,
              role: '',
              title: 'Style',
            },
            disableClose: true,
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (!result.isCancel && !result['isResearchComplete']) {
              const dialogRef = this.matDialog.open(
                SelectJobRoleDialogComponent,
                {
                  width: '50vw',
                  maxWidth: '50vw',
                  height: '24vh',
                  maxHeight: '24vh',
                  data: { isCompletedFirstPart: true },
                  disableClose: true,
                }
              );
              dialogRef.afterClosed().subscribe((result) => {
                if (!result.isCancel) {
                  // next mcq
                  this.openStretegySurvey();
                }
              });
            } else {
              // INFO: Changing flag since incomplete button is not visble on close of modal using x button
              // this.isStrategyComplete = true;
              this.isStrategyComplete = false;
            }
          });
        },
        (err) => {
          console.error(err), (this.loadCounter -= 1);
        }
      );
  }

  openStretegySurvey() {
    this.loadCounter += 1;
    this.http
      .get(
        `${environment.baseurl}/question/get-questions?type=Strategy&page=1&limit=10`
      )
      .subscribe(
        (res: any) => {
          this.loadCounter += 1;
          // strategy dialog
          const dialogRef = this.matDialog.open(SelectJobRoleDialogComponent, {
            width: '100vw',
            maxWidth: '100vw',
            height: '100vh',
            maxHeight: '100vh',
            panelClass: 'level-dialog',
            data: {
              isMCQ: true,
              questionData: res.message,
              role: 'selectedRoleValue',
              title: 'Strategy',
            },
            disableClose: true,
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (!result.isCancel) {
              if (result.isCloseAllModel != true) {
                this.openResearch();
              }
            }
            this.loadCounter = 0;
          });
        },
        (err) => {
          this.loadCounter -= 1;
        }
      );
  }

  openResearch() {
    const dialogRef = this.matDialog.open(SelectJobRoleDialogComponent, {
      width: '80vw',
      maxWidth: '80vw',
      height: '100vh',
      maxHeight: '100vh',
      panelClass: 'level-dialog-research',
      data: { currentView: 'RESEARCH_QUESTIONS_1' },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.isStrategyComplete = true;
      this.loadCounter += 1;
      if (!result.isCancel) {
        this.loadCounter = 0;
        this.isStrategyComplete = true;
      } else {
        this.isStrategyComplete = false;
      }
      this.loadCounter = 0;
    });
  }

  getQuestionData(role, limit, page) {
    this.loadCounter += 1;
    this.http
      .get(
        `${environment.baseurl}/question/get-questions?role=${role}&type=Style&page=${page}&limit=${limit}`
      )
      .subscribe(
        (res: any) => {
          return res.message;
        },
        (err: any) => {
          console.error(err);
          this.loadCounter -= 1;
          return false;
        }
      );
  }
  routeTopage() {
    let type: boolean = true;

    this.router.navigate(['/explore/aboutgrowthleaders'], {
      state: { example: type },
    });
  }
}
