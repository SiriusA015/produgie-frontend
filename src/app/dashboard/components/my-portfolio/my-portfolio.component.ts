import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { SdMyadviceComponent } from 'src/app/sprint/components/sprint-dashboard/modals/sd-myadvice/sd-myadvice.component';
import { SdMycommentsComponent } from 'src/app/sprint/components/sprint-dashboard/modals/sd-mycomments/sd-mycomments.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.scss']
})
export class MyPortfolioComponent implements OnInit {
  loadCounter = 0;
  nullPortfolio = false;
  userSprints = [];
  isStop = false;
  data: any;
  sprintId;
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  capabilities = [];
  advice = [];
  comment = [
    {title: 'dummy comment'},
    {title: 'dummy comment 2'}
  ];
  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private configService: ConfigService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllSprints();
  }

  checkEmpty(obj) {
    return _.isEmpty(obj);
  }

  getAllSprints() {
    this.loadCounter += 1;
    this.http
      .get(`${environment.baseurl}/usersprint/portfolio`)
      .subscribe(
        (res: any) => {
          this.loadCounter -= 1;
          if (res.data.length > 0) {
            // this.userSprints = res.data;
            this.userSprints = _.sortBy(res.data, (o) => o.assessmentId).reverse();
            this.getAllDatabyId(this.userSprints[0].assessmentId);
          }
          else{
            this.nullPortfolio = true;
          }
        },
        (err) => {
          console.log(err);
          this.loadCounter -= 1;
        }
      );
  }
  getAllData() {
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/development/get-plan`).subscribe(
      (res: any) => {
        this.data = res.message;
        this.allaction = [...this.data.action, ...this.data.customAction];
        this.allbehavior = [...this.data.behaviour, ...this.data.customBehaviour];
        this.alloutcome = [...this.data.outcome, ...this.data.customOutcome];
        this.sprintId = this.data.userSprint.sprintId;
        this.isStop = this.data.userSprint.isStop;
        this.loadCounter -= 1;
      },
      err => {
        console.log(err);
        this.loadCounter -= 1;
        this.router.navigate(['/design/']);
      }
    );
  }
  getAllDatabyId(assessmentId) {
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/development/get-plan-portfolio/${assessmentId}`).subscribe(
      (res: any) => {
        this.data = res.message;
        this.allaction = [...this.data.action, ...this.data.customAction];
        this.allbehavior = [...this.data.behaviour, ...this.data.customBehaviour];
        this.alloutcome = [...this.data.outcome, ...this.data.customOutcome];
        this.sprintId = this.data.userSprint.sprintId;
        this.isStop = this.data.userSprint.isStop;
        this.loadCounter -= 1;
      },
      err => {
        console.log(err);
        this.loadCounter -= 1;
        this.router.navigate(['/design/']);
      }
    );
  }
  openAdvice() {
    const dialogRef = this.dialog.open(SdMyadviceComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      panelClass: 'custom-dialog-container'
    });
  }
  openComment() {
    const dialogRef = this.dialog.open(SdMycommentsComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      panelClass: 'custom-dialog-container'
    });
  }
  onSprintSelect(event){
    this.getAllDatabyId(event);
  }
}
