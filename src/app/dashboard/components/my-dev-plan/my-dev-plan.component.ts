import { MyCommentsComponent } from './modals/my-comments/my-comments.component';
import { MyAdviceComponent } from './modals/my-advice/my-advice.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/service/auth.service';

declare const window: any;
@Component({
  selector: 'app-my-dev-plan',
  templateUrl: './my-dev-plan.component.html',
  styleUrls: ['./my-dev-plan.component.scss'],
})
export class MyDevPlanComponent implements OnInit {
  isStop = false;
  isFinished = false;
  data: any;
  sprintId;
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  capabilities = [];
  advice = [
    {
      adviceby: {
        name: 'Lucy',
        role: 'Manager',
      },
      date: '12 Sep, 2020',
      time: '12:38 pm',
      adviceText: 'dummy text',
    },
    {
      adviceby: {
        name: 'Lucy',
        role: 'Manager',
      },
      date: '12 Sep, 2020',
      time: '12:38 pm',
      adviceText: 'dummy text',
    },
    {
      adviceby: {
        name: 'Lucy',
        role: 'Manager',
      },
      date: '12 Sep, 2020',
      time: '12:38 pm',
      adviceText: 'dummy text',
    },
    {
      adviceby: {
        name: 'Lucy',
        role: 'Manager',
      },
      date: '12 Sep, 2020',
      time: '12:38 pm',
      adviceText: 'dummy text',
    },
    {
      adviceby: {
        name: 'Lucy',
        role: 'Manager',
      },
      date: '12 Sep, 2020',
      time: '12:38 pm',
      adviceText: 'dummy text',
    },
  ];
  comment = [{ title: 'dummy comment' }, { title: 'dummy comment 2' }];
  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private configService: ConfigService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllData();
    // this.getCapWithRank();
  }
  sprintReviewEndTimeCheck(dateTime: string){
    return new Date(dateTime).getTime() < Date.now();
  }

  checkEmpty(obj) {
    return _.isEmpty(obj);
  }

  getCapWithRank() {
    this.configService.setConfig({ isLoader: true });
    this.http
      .get(`${environment.baseurl}/capabilityscoredata/capability-rank`)
      .subscribe(
        (res: any) => {
          this.capabilities = res.data;
          this.capabilities = this.capabilities.filter((o) => o.rank <= 3);
          // this.configService.setConfig({ isLoader: false });
          this.getAllData();
        },
        (err) => console.log(err)
      );
  }
  getAllData() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${environment.baseurl}/development/get-plan`).subscribe(
      (res: any) => {
        this.data = res.message;
        this.allaction = [...this.data.action, ...this.data.customAction];
        this.allbehavior = [
          ...this.data.behaviour,
          ...this.data.customBehaviour,
        ];
        this.alloutcome = [...this.data.outcome, ...this.data.customOutcome];
        this.sprintId = this.data.userSprint.sprintId;
        this.isStop = this.data.userSprint.isStop;
        this.isFinished = this.data.userSprint.isFinished;
        this.capabilities = _.sortBy(this.data.capabilityRank,  (o) => o.rank);
        this.configService.setConfig({ isLoader: false });
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/design/']);
      }
    );
  }
  redirectToDesign() {
    this.configService.setConfig({ isLoader: true });
    this.http
      .patch(`${environment.baseurl}/usersprint/send-to-portfolio`, {
        userSprintId: this.data.userSprint.id,
        assessmentId: this.data.userSprint.assessmentId,
      })
      .subscribe(
        (res: any) => {
          console.log(res.message);
          this.router.navigate(['/design']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
