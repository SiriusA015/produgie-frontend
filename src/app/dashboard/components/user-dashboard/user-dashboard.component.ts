import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { ResponseMenuDialogComponent } from 'src/app/sprint/components/sprint-dashboard/modals/response-menu-dialog/response-menu-dialog.component';
import { SdMyadviceComponent } from 'src/app/sprint/components/sprint-dashboard/modals/sd-myadvice/sd-myadvice.component';
import { SdMycommentsComponent } from 'src/app/sprint/components/sprint-dashboard/modals/sd-mycomments/sd-mycomments.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  isStop = false;
  data: any;
  sprintId;
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  capabilities = [];
  loadCounter = 0;
  comment = [{ title: 'dummy comment' }, { title: 'dummy comment 2' }];
  zeroSprint: boolean;
  fadPriorities: any[] = [];
  FADs: any[] = [];
  jobRoles: any[] = [];
  advice = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private configService: ConfigService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.getCapWithRank();
    this.getTopFads();
    this.getTopJobRoles();
    this.getTopPriorityFads();
  }

  checkEmpty(obj) {
    return _.isEmpty(obj);
  }

  getCapWithRank() {
    // this.configService.setConfig({ isLoader: true });
    this.loadCounter += 1;
    this.http
      .get(`${environment.baseurl}/capabilityscoredata/capability-rank`)
      .subscribe(
        (res: any) => {
          this.loadCounter -= 1;
          this.capabilities = res.data;
          this.capabilities = this.capabilities.filter((o) => o.rank <= 3);
          this.getAllData();
        },
        (err) => {
          console.log(err);
          this.loadCounter -= 1;
        }
      );
  }

  getTopFads(){
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/selectedfad/top-fad`).subscribe(
      (res: any) => {
        this.FADs = res.data;
        this.loadCounter -= 1;
      },
      err => {
        console.log(err);
        this.loadCounter -= 1;
      }
    );
  }
  getTopPriorityFads(){
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/selectedfad/top-fad-priority`).subscribe(
      (res: any) => {
        this.fadPriorities = res.data;
        this.loadCounter -= 1;
      },
      err => {
        console.log(err);
        this.loadCounter -= 1;
      }
    );
  }
  getTopJobRoles(){
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/selectedjobrole/top-job-role`).subscribe(
      (res: any) => {
        this.jobRoles = res.data;
        this.loadCounter -= 1;
      },
      err => {
        console.log(err);
        this.loadCounter -= 1;
      }
    );
  }
  getAllData() {
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/development/get-plan`).subscribe(
      (res: any) => {
        if (res) {
          this.data = res.message;
          this.allaction = [...this.data.action, ...this.data.customAction];
          this.allbehavior = [
            ...this.data.behaviour,
            ...this.data.customBehaviour,
          ];
          this.alloutcome = [...this.data.outcome, ...this.data.customOutcome];
          this.sprintId = this.data.userSprint.sprintId;
          this.isStop = this.data.userSprint.isStop;
          this.loadCounter -= 1;
          // this.configService.setConfig({isLoader: false});
        }
      },
      (err) => {
        this.loadCounter -= 1;
        // this.configService.setConfig({isLoader: false});
        console.log(err);
        this.zeroSprint = true;
      }
    );
  }
  openResponseMenu() {
    const dialogRef = this.dialog.open(ResponseMenuDialogComponent, {
      width: '100%',
      maxWidth: '90%',
      panelClass: 'custom-menu-container',
      data: this.advice,
    });
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
}
