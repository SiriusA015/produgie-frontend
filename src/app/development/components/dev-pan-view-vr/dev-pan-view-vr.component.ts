import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dev-pan-view-vr',
  templateUrl: './dev-pan-view-vr.component.html',
  styleUrls: ['./dev-pan-view-vr.component.scss']
})
export class DevPanViewVrComponent implements OnInit {
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
  crew: any;
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
      .get(`${environment.baseurl}/development/get-plan-view-vr`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          uuid: `${this.uuid}`,
        },
      })
      .subscribe(
        (res: any) => {
          this.data = res.message;
          console.log('@@@@@',this.data);
          this.allaction = [...this.data.action, ...this.data.customAction];
          this.allbehavior = [
            ...this.data.behaviour,
            ...this.data.customBehaviour,
          ];
          this.alloutcome = [...this.data.outcome, ...this.data.customOutcome];
          this.capabilities = this.data.capabilityRank;
          this.sprintId = this.data.userSprint.sprintId;
          this.crew = this.data.crew;
          console.log('@@@@@crew',this.crew);
          if (this.allaction.length > 0 && this.allbehavior.length > 0 && this.alloutcome.length > 0) {
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
