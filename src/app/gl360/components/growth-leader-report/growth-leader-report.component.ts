import { FullReportComponent } from './../../modals/full-report/full-report.component';
import { GrowthLeaderCircleComponent } from './../growth-leader-circle/growth-leader-circle.component';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../../../shared/service/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DetailedReportDialogComponent } from 'src/app/explore/components/modals/detailed-report-dialog/detailed-report-dialog.component';
import { RankService } from 'src/app/explore/service/rank.service';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';

@Component({
  selector: 'app-growth-leader-report',
  templateUrl: './growth-leader-report.component.html',
  styleUrls: ['./growth-leader-report.component.scss'],
})
export class GrowthLeaderReportComponent implements OnInit {
  @ViewChild(GrowthLeaderCircleComponent)
  snapCircle: GrowthLeaderCircleComponent;
  isCircle = true;
  rankChecked = false;
  highest: boolean;
  lowest: boolean;
  capabilities = [];
  selectedJobRoles = [];
  isRecommendChecked = false;
  isHighest = false;
  isLowest = false;
  fCapabilities: any[];
  reportGenerated: any = false;
  gl360statuscompleted:any = false;
  triggerData: any;
  capEnergise: any[];
  capPerform: any[];
  capTransform: any[];
  selectedOption = 'gl360';
  gla360ReportGenerated: any;


  constructor(
    public rankService: RankService,
    private configService: ConfigService,
    private http: HttpClient,
    private matDialog: MatDialog,
    private dataCheck: DataCheckService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.configService.setConfig({ isLoader: true });
    // this.getCapWithRank();
    this.dataCheck.getAssessmentTrigger().subscribe(
      (res: any) => {
        if (!res.isAgree) {
          this.router.navigate(['/auth/policy-consent']);
        }
        this.triggerData = res.data;
        this.gla360ReportGenerated = this.triggerData.gla360ReportGenerated;
        // console.log(this.reportGenerated,"check");
        if (this.gla360ReportGenerated) {
          this.getCapWithRank();
          // this.getRecommendedFad();
          // this.getJobs();
        } else {
          this.configService.setConfig({ isLoader: false });
        }
      },
      (err) => {
        this.configService.setConfig({ isLoader: false });
        console.error(err);
      }
    );

this.glastatus();

  }
  getCapWithRank() {
    this.configService.setConfig({ isLoader: true });
    this.http
      .get(`${environment.baseurl}/nomineeresponsescore/capability-rank`)
      .subscribe(
        (res: any) => {
          this.capabilities = res.data;
          this.capEnergise = this.capabilities.filter(
            (o) => o.capability.capabilityType.toLowerCase() === 'energize'
          );
          this.capPerform = this.capabilities.filter(
            (o) => o.capability.capabilityType.toLowerCase() === 'perform'
          );
          this.capTransform = this.capabilities.filter(
            (o) => o.capability.capabilityType.toLowerCase() === 'transform'
          );
          this.fCapabilities = [
            ...this.capPerform,
            ...this.capTransform,
            ...this.capEnergise,
          ];
          this.configService.setConfig({ isLoader: false });
        },
        (err) => console.log(err)
      );
  }
  getJobs() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${environment.baseurl}/jobrole/get-jobs`).subscribe(
      (res: any) => {
        const allJobs = res.data.job.reverse();
        const selectedIds = res.data.selectedJob.map((o) => o.jobRoleId);
        this.selectedJobRoles = allJobs.filter(
          (o) => selectedIds.indexOf(o.id) !== -1
        );
        this.configService.setConfig({ isLoader: false });
      },
      (err) => {
        console.error(err);
        this.configService.setConfig({ isLoader: false });
      }
    );
  }
  getRecommendedFad() {
    this.configService.setConfig({ isLoader: true });
    this.http
      .get(`${environment.baseurl}/recommendedfad/get-recommended`)
      .subscribe(
        (res: any) => {
          this.configService.setConfig({ isLoader: false });
        },
        (err) => {
          console.error(err);
        }
      );
  }
  changeRankCheck() {
    this.rankChecked = !this.rankChecked;
  }

  changeHighest() {
    if (this.isHighest) {
      this.isHighest = false;
      this.isLowest = false;
      this.isRecommendChecked = false;
      this.rankService.setConfig({ rank: 'highest' });
      this.clearFilter();
      return;
    }

    this.isHighest = true;
    this.isLowest = false;
    this.isRecommendChecked = false;
    this.rankService.setConfig({ rank: 'highest' });
    this.highestRanked();
  }
  changeLowest() {
    if (this.isLowest) {
      this.isLowest = false;
      this.isHighest = false;
      this.isRecommendChecked = false;
      this.rankService.setConfig({ rank: 'lowest' });
      this.clearFilter();
      return;
    }
    this.isLowest = true;
    this.isHighest = false;
    this.isRecommendChecked = false;
    this.rankService.setConfig({ rank: 'lowest' });
    this.lowestRanked();
  }
  changeRecommendCheck() {
    this.isHighest = false;
    this.isLowest = false;
    this.isRecommendChecked = !this.isRecommendChecked;
    if (this.isRecommendChecked) {
      this.isRecommended();
      // this.snapBox.isRecommended();
    } else {
      this.clearFilter();
    }
  }
  getCapabilities() {
    this.http.get(`${environment.baseurl}/capability/get-capability`).subscribe(
      (res: any) => {
        this.capabilities = res.data;
        console.log(this.capabilities);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  highestRanked() {
    this.fCapabilities = this.capabilities.filter((o) => o.rank <= 3);
    if (this.isCircle) {
      this.capEnergise = this.fCapabilities.filter(
        (o) => o.capability.capabilityType.toLowerCase() === 'energize'
      );
      this.capPerform = this.fCapabilities.filter(
        (o) => o.capability.capabilityType.toLowerCase() === 'perform'
      );
      this.capTransform = this.fCapabilities.filter(
        (o) => o.capability.capabilityType.toLowerCase() === 'transform'
      );
    }
  }
  lowestRanked() {
    this.fCapabilities = this.capabilities.filter((o) => o.rank >= 7);
    if (this.isCircle) {
      this.capEnergise = this.fCapabilities.filter(
        (o) => o.capability.capabilityType.toLowerCase() === 'energize'
      );
      this.capPerform = this.fCapabilities.filter(
        (o) => o.capability.capabilityType.toLowerCase() === 'perform'
      );
      this.capTransform = this.fCapabilities.filter(
        (o) => o.capability.capabilityType.toLowerCase() === 'transform'
      );
    }
  }
  isRecommended() {
    this.fCapabilities = this.capabilities.filter((o) => o.recommended);
    this.capEnergise = this.fCapabilities.filter(
      (o) => o.capability.capabilityType.toLowerCase() === 'energize'
    );
    this.capPerform = this.fCapabilities.filter(
      (o) => o.capability.capabilityType.toLowerCase() === 'perform'
    );

    this.capTransform = this.fCapabilities.filter(
      (o) => o.capability.capabilityType.toLowerCase() === 'transform'
    );
  }
  clearFilter() {
    this.fCapabilities = this.capabilities;
    if (this.isCircle) {
      this.capEnergise = this.fCapabilities.filter(
        (o) => o.capability.capabilityType.toLowerCase() === 'energize'
      );
      this.capPerform = this.fCapabilities.filter(
        (o) => o.capability.capabilityType.toLowerCase() === 'perform'
      );
      this.capTransform = this.fCapabilities.filter(
        (o) => o.capability.capabilityType.toLowerCase() === 'transform'
      );
    }
  }
  showDetailsCircle() {
    this.openSnackBar(
      'View your 9 capabilities on the Growth Leader Framework'
    );
  }
  showDetailsBox() {
    this.openSnackBar('View Strength and Development needs on a 2 x 2 Grid');
  }
  openSnackBar(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 2500,
    });
  }
  openDetailedDialog() {
    const dialogRef = this.matDialog.open(FullReportComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  gotoGla(){
    this.router.navigate(['/explore/mysnapshot']);
  }



  glastatus()
  {
    this.http.get(`${environment.baseurl}/question/get-gla-status`).subscribe(
      (res: any) => {
        console.log(res, 'gl');
        this.gl360statuscompleted = res.message['gla_360_survey_completed'];
        // if (this.glstatus == true) {
        //   this.gl360status = true;
        // }
        // else {
        //   this.gl360status = false;
        // }
        console.log(this.gl360statuscompleted, "status check")
      },
      err => {
        console.error(err);
      }
    );
  }
}
