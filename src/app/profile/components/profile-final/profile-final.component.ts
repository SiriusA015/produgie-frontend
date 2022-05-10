import { ConfigService } from '../../../shared/service/config.service';
import { DataService } from 'src/app/design/service/data.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-final',
  templateUrl: './profile-final.component.html',
  styleUrls: ['./profile-final.component.scss'],
})
export class ProfileFinalComponent implements OnInit {
  data: any;
  sprintId;
  assessmentId: any;
  capabilities = [];
  allaction: any[] = [];
  alloutcome: any[] = [];
  allbehavior: any[] = [];
  advice: any = [];
  feedback: any = [];
  userSprint: any;
  loading: boolean = false;
  design = 'design';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.assessmentId = params.id;
    });

    this.configService.setConfig({ isLoader: true });

    Promise.all([
      this.getCapWithRank()
    ]).then((values) => {
      this.loading = false;
    });
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
    this.http.get(`${environment.baseurl}/development/get-plan-portfolio/${this.assessmentId}`).subscribe(
    // this.http.get(`http://127.0.0.1:9000/development/get-plan-portfolio/${this.assessmentId}`).subscribe(
      (res: any) => {
        this.data = res.message;
        this.allaction = [...this.data.action, ...this.data.customAction];
        this.allbehavior = [
          ...this.data.behaviour,
          ...this.data.customBehaviour,
        ];
        this.alloutcome = [...this.data.outcome, ...this.data.customOutcome];
        this.sprintId = this.data.userSprint.sprintId;
        this.userSprint = this.data.userSprint;
        this.advice = res.advice;
        this.feedback = res.feedback;
        this.configService.setConfig({ isLoader: false });
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/error/']);
      }
    );
  }

  // getUserSprint() {
  //   this.http.get(`${environment.baseurl}/usersprint/get-usersprint`).subscribe(
  //     (res: any) => {
  //       if (res.data?.length > 0) {
  //         console.log('thi sis userSprint', res)
  //         this.userSprint = res.data[0];
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
