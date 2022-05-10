import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataCheckService } from '../../../shared/service/dataCheck.service';
import { DataService } from '../../service/data.service';
import { HttpService } from 'src/app/explore/service/http.service';
import { MatDialog } from '@angular/material/dialog';
import { DesignService } from 'src/app/teams/design-team/design.service';

const baseUrl = environment.baseurl;
@Component({
  selector: 'app-design-welcome',
  templateUrl: './design-welcome.component.html',
  styleUrls: ['./design-welcome.component.scss']
})
export class DesignWelcomeComponent implements OnInit {
  data: any;
  assessmentId: number;
  message: any;
  Surveycompleted: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService,
    private dataCheck: DataCheckService,
    private dataService: DataService,
    private httpservice: HttpService,
    private dialog: MatDialog,
    private designService : DesignService
  ) { }

  ngOnInit(): void {

    //  this.httpservice.getsurveystatus();
    //  this.httpservice.surveystatus.subscribe(res => {
    //   this.Surveycompleted = res
    //   console.log(res);

    // })

    this.configService.setConfig({ isLoader: true });

    this.getAssessmentTrigger();
  }

  getAssessment() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${baseUrl}/glaassessment/get-started`).subscribe(
      (res: any) => {
        this.dataService.nextMessage({ isEditState: false });
        this.router.navigate(['/design/fad']);
      },
      err => {
        console.log(err);
      }
    );
  }

  getAssessmentTrigger() {

    this.dataCheck.getAssessmentTrigger().subscribe(
      (res: any) => {
        if (res.data.isDesignEdit) {
          this.dataService.nextMessage({ isEdit: false, isResetDesignEdit: true, isEditState: true });
          this.router.navigate(['/design/sprint-final']);
          // this.dialog.open(ConfirmDialogComponent, {
          //   width: '250px',
          //     });
          // this.configService.setConfig({ isLoader: false });
        } else {
          this.Surveycompleted = res.data['styleSurveyCompleted'];
          console.log('this is this.Surveycompleted', this.Surveycompleted)
          this.dataService.nextMessage( {surveyCompleted: this.Surveycompleted})
          this.configService.setConfig({ isLoader: false });
        }
      },
      (err) => console.error(err)
    );
  }


}


