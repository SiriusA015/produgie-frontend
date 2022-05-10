import { ConfigService } from './../../../shared/service/config.service';
import { DataService } from 'src/app/design/service/data.service';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-design-final',
  templateUrl: './design-final.component.html',
  styleUrls: ['./design-final.component.scss'],
})
export class DesignFinalComponent implements OnInit {
  data: any;
  sprintId;
  capabilities = [];
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  userSprint: any;
  design = 'design';

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {

    this.configService.setConfig({ isLoader: true });
    this.getCapWithRank();
    // tslint:disable-next-line:max-line-length
    this.dataService.nextMessage({
      faddev: true,
      fadfocus: true,
      sprint: true,
      action: true,
      behaviour: true,
      outcome: true,
      crew: true,
      frequency: true,
      isConfirm: true,
      step: 4,
    });
    this.getUserSprint();
  }
  getCapWithRank() {
    this.configService.setConfig({ isLoader: true });
    this.http
      .get(`${environment.baseurl}/capabilityscoredata/capability-rank`)
      .subscribe(
        (res: any) => {
          this.capabilities = res.data;
          this.capabilities = this.capabilities.filter((o) => o.rank <= 3);
          this.getAllData();
        },
        (err) => console.log(err)
      );
  }

  getAllData() {
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
        this.configService.setConfig({ isLoader: false });
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/error/']);
      }
    );
  }
  getUserSprint() {
    this.http.get(`${environment.baseurl}/usersprint/get-usersprint`).subscribe(
      (res: any) => {
        if (res.data?.length > 0) {
          this.userSprint = res.data[0];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
