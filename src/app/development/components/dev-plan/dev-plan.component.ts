import { AdviceFormComponent } from './modals/advice-form/advice-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
@Component({
  selector: 'app-dev-plan',
  templateUrl: './dev-plan.component.html',
  styleUrls: ['./dev-plan.component.scss'],
})
export class DevPlanComponent implements OnInit {
  isLoader = true;
  clientId = 1;
  userId = 1;
  data: any;
  sprintId;
  advice = {};
  uuid: any;
  token: any;
  username = '';
  capabilities = [];
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  stored = false;
  userSprint: any;
  authToken: any;
  name: any;
  advicecomp:'advicecomp';

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
    this.route.params.subscribe((params) => {
      this.uuid = params.uuid;
      this.token = params.token;
      // this.authToken = localStorage.setItem('authToken', this.token);

    });
    this.getAllData();
  }

  checkEmpty(obj) {
    return _.isEmpty(obj);
  }

  getAllData() {
    this.configService.setConfig({ isLoader: true });
    this.http
      .get(`${environment.baseurl}/development/get-plan-advice`, {
        headers: {
          // Authorization: `Bearer ${this.token}`,
          Authorization: 'Bearer ' + this.token,
          uuid: `${this.uuid}`,
        },
      })
      .subscribe(
        (res: any) => {
          this.data = res.message;
          this.name = res.message.name;
          console.log(this.data);
          this.sprintId = this.data.userSprint.sprintId;
          this.allaction = [...this.data.action, ...this.data.customAction];
          this.allbehavior = [
            ...this.data.behaviour,
            ...this.data.customBehaviour,
          ];
          this.alloutcome = [...this.data.outcome, ...this.data.customOutcome];
          this.capabilities = this.capabilities = _.sortBy(this.data.capabilityRank,  (o) => o.rank);
          this.advice = this.data.advice ? {text: this.data.advice} : {};
          console.log(this.advice);
          this.configService.setConfig({ isLoader: false });
          if (this.allaction.length > 0 && this.allbehavior.length > 0 && this.alloutcome.length > 0) {
            this.isLoader = false;
          }
        },
        (err) => {
          console.log(err);
          this.isLoader = false;
          this.router.navigate(['/notfound/'],{queryParams: { errMessage: err.error.message }});
        }
      );
  }
  openAdvice() {
    const dialogRef = this.dialog.open(AdviceFormComponent, {
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
    const dialogRef = this.dialog.open(AdviceFormComponent, {
      width: '40vw',
      height: '100vh',
      position: { right: '0', top: '0' },
      data: {
        isEdit: true,
        advice: this.advice,
        uuid: this.uuid,
        token: this.token,
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
