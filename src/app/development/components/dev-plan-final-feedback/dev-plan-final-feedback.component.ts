import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';
import { FeedbackFormComponent } from '../dev-plan/modals/feedback-form/feedback-form.component';
import { FinalFeedbackFormComponent } from '../dev-plan/modals/final-feedback-form/final-feedback-form.component';

@Component({
  selector: 'app-dev-plan-final-feedback',
  templateUrl: './dev-plan-final-feedback.component.html',
  styleUrls: ['./dev-plan-final-feedback.component.scss']
})
export class DevPlanFinalFeedbackComponent implements OnInit {
  isLoader = true;
  clientId = 1;
  userId = 1;
  data: any;
  sprintId;
  uuid: any;
  token: any;
  feedback = {};
  username = '';
  capabilities = [];
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  stored = false;
  filteredDate = [];
  dateRange: any = {};
  finalFeedbackpage="finalFeedbackpage";
  userSprint: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private configService: ConfigService,
    public dialog: MatDialog,
   private httpBackend: HttpBackend
  ) { 
    this.http = new HttpClient(httpBackend);
  }

  ngOnInit(): void {
    this.username = 'User';
    this.route.params.subscribe((params) => {
      this.uuid = params.uuid;
      this.token = params.token;
    });
    this.getAllData();
    // tslint:disable-next-line:max-line-length
    this.dataService.nextMessage({
      fad: true,
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
  getAllData() {
    this.configService.setConfig({ isLoader: true });
    this.http
      .get(`${environment.baseurl}/development/get-plan-feedback`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          uuid: `${this.uuid}`,
        },
      })
      .subscribe(
        (res: any) => {
          this.data = res.message;
          this.sprintId = this.data.userSprint.sprintId;
          let fDate = moment(this.data.userSprint.datetimeFrom);
          let endDate = moment(this.data.userSprint.datetimeTo);
          while (endDate.isAfter(fDate)) {
            this.filteredDate.push(fDate.toISOString());
            fDate = fDate.add(this.data.userSprint.frequency, 'd');
          }
          for (let index = 1; index < this.filteredDate.length; index++) {
            if (
              moment(res.time)
                .subtract(2, 'd')
                .isBetween(
                  moment(this.filteredDate[index - 1]),
                  moment(this.filteredDate[index])
                )
            ) {
              this.dateRange['firstDate'] = this.filteredDate[index - 1];
              this.dateRange['lastDate'] = this.filteredDate[index];
              break;
            }
          }
          this.allaction = [...this.data.action, ...this.data.customAction];
          this.allbehavior = [
            ...this.data.behaviour.sort((x,y)=>x.id - y.id),
            ...this.data.customBehaviour.sort((x,y)=>x.id - y.id),
          ];
          this.alloutcome = [
            ...this.data.outcome.sort((x,y)=>x.id - y.id), 
            ...this.data.customOutcome.sort((x,y)=>x.id - y.id)
          ];
          this.capabilities = _.sortBy(this.data.capabilityRank,  (o) => o.rank);          
          this.feedback = this.data.adviceAndRating.isComplete
            ? {
                feedback: this.data.feedback ? this.data.feedback : null,
                behaviourFeedback: this.data.behaviourFeedback ? this.data.behaviourFeedback : null,
                outcomeFeedback: this.data.outcomeFeedback ? this.data.outcomeFeedback : null,
                feedbackAdvice : this.data?.adviceAndRating?.advice ? this.data.adviceAndRating.advice : null,
                sprintRating : this.data?.adviceAndRating?.rating ? this.data.adviceAndRating.rating : null,
              }
            : {};
          if (
            this.allaction.length > 0 &&
            this.allbehavior.length > 0 &&
            this.alloutcome.length > 0
          ) {
            this.isLoader = false;
          }
        },
        (err) => {
          console.log(err);
          this.isLoader = false;
          this.router.navigate(['/not-found/'],{ queryParams: { errMessage: err.error.message } });
        }
      );
  }
  checkEmpty(obj) {
    return _.isEmpty(obj);
  }
  openAdvice() {
    const dialogRef = this.dialog.open(FinalFeedbackFormComponent, {
      width: '50vw',
      height: '100vh',
      position: { right: '0', top: '0' },
      data: {
        behaviour: this.allbehavior,
        outcome: this.alloutcome,
        selectedBehaviour: this.data.selectedBehaviour,
        selectedOutcome: this.data.selectedOutcome,
        uuid: this.uuid,
        token: this.token,
        dateRange: this.dateRange
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.feedback = result.feedback;
        console.log("result")
        console.log(result)
        this.stored = result.stored;
      }
    });
  }
  editAdvice() {
    const dialogRef = this.dialog.open(FinalFeedbackFormComponent, {
      width: '50vw',
      height: '100vh',
      position: { right: '0', top: '0' },
      data: {
        isEdit: true,
        feedback: this.feedback,
        behaviour: this.allbehavior,
        outcome: this.alloutcome,
        selectedBehaviour: this.data.selectedBehaviour,
        selectedOutcome: this.data.selectedOutcome,
        uuid: this.uuid,
        token: this.token,
        dateRange: this.dateRange
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        console.log("result")
        console.log(result)
        this.feedback = result.feedback;
        this.stored = result.stored;
      }
    });
  }
}
