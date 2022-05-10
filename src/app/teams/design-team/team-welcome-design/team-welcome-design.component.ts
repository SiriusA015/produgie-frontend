import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';
import { environment } from 'src/environments/environment';
import {DesignService}from '../design.service';
import { TeamDesignStatusComponent } from '../Modal/team-sprint-save/team-design-status/team-design-status.component';
const baseUrl = environment.baseurl;
@Component({
  selector: 'app-team-welcome-design',
  templateUrl: './team-welcome-design.component.html',
  styleUrls: ['./team-welcome-design.component.scss']
})
export class TeamWelcomeDesignComponent implements OnInit {

  status: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService,
    private dataCheck: DataCheckService,
    private designService:DesignService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.getAssessmentTrigger();
}

  getAssessment() {
    this.configService.setConfig({ isLoader: true });
   this.designService.getStarted().subscribe(
      (res: any) => {
        console.log(res.teamGlaAssessmentTrigger.id);
        localStorage.setItem('assesmentId',res.teamGlaAssessmentTrigger.id)
        this.configService.setConfig({ isLoader: false }); 
        this.router.navigate(['teams/design/teams-fad']);       
        // if(this.status && res.teamGlaAssessmentTrigger.team_alignment_report_generated){
        //   this.router.navigate(['teams/design/teams-fad']);        
        // }
        // else{
        //   this.toastr.warning('warning', "GLA/Team Alignment Report is mandatory to proceed to Design", {
        //     timeOut: 3000,
        //   }); 
        //   this.router.navigate(['teams/explore/team-portal']);
        // }
      },
      err => {
        this.configService.setConfig({ isLoader: false });
        console.log(err);
      }
    );
  }



  getAssessmentTrigger() {
      this.configService.setConfig({ isLoader: true });
      this.designService.teamDesignStatus().subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        if (res.designCompleted) {
          // this.dataService.nextMessage({ isEdit: false, isResetDesignEdit: true });
          this.router.navigate(['/not-found']);
          this.dialog.open(TeamDesignStatusComponent, {
            width: '450px',
            disableClose: true,
          });
          
        }

        if(res.designInProcess) this.router.navigate(['teams/design/dev-plan']);
      },
      (err) => {
        console.error(err);
        this.configService.setConfig({ isLoader: false }); 
      }

    );
  }



}
