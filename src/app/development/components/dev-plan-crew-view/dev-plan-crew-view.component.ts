import { ActivatedRoute, Router } from '@angular/router';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-dev-plan-crew-view',
  templateUrl: './dev-plan-crew-view.component.html',
  styleUrls: ['./dev-plan-crew-view.component.scss'],
})
export class DevPlanCrewViewComponent implements OnInit {
  isLoader = true;
  token: any;
  uuid: any;
  data: any;
  sprintId: any;
  username: string;
  capabilities = [];
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  filteredDate = [];
  userSprint: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
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
  }
  getAllData() {
    this.http
      .get(`${environment.baseurl}/development/get-plan-view`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          uuid: `${this.uuid}`,
        },
      })
      .subscribe(
        (res: any) => {
          this.data = res.message;
          console.log(this.data);
          this.allaction = [...this.data.action, ...this.data.customAction];
          this.allbehavior = [
            ...this.data.behaviour,
            ...this.data.customBehaviour,
          ];
          this.alloutcome = [...this.data.outcome, ...this.data.customOutcome];
          this.capabilities = this.data.capabilityRank;

          this.sprintId = this.data.userSprint.sprintId;
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
          this.router.navigate(['/not-found/']);
        }
      );
  }
  checkEmpty(obj) {
    return _.isEmpty(obj);
  }
}
