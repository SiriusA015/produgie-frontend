import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SnapshotBoxComponent } from './snapshot-box/snapshot-box.component';
import { MatDialog } from '@angular/material/dialog';
import { DetailedReportDialogComponent } from './../modals/detailed-report-dialog/detailed-report-dialog.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/shared/service/config.service';
import { RankService } from './../../service/rank.service';
import { SnapshotCircleComponent } from './snapshot-circle/snapshot-circle.component';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-snapshot',
  templateUrl: './my-snapshot.component.html',
  styleUrls: ['./my-snapshot.component.scss'],
})
export class MySnapshotComponent implements OnInit {
  @ViewChild(SnapshotCircleComponent) snapCircle: SnapshotCircleComponent;
  @ViewChild(SnapshotBoxComponent) snapBox: SnapshotBoxComponent;
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
  reportGenerated = false;
  triggerData: any;
  capEnergise: any[];
  capPerform: any[];
  capTransform: any[];
  selectedOption = 'gla';
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
    this.dataCheck.getAssessmentTrigger().subscribe(
      (res: any) => {
        if (!res.isAgree) {
          this.router.navigate(['/auth/policy-consent']);
        }
        this.triggerData = res.data;
        // this.reportGenerated = this.triggerData.reportGenerated;
        this.reportGenerated = res.data['reportGenerated'];
        if (this.reportGenerated) {
          this.getCapWithRank();
          this.getRecommendedFad();
          this.getJobs();
        }
        else{
          this.configService.setConfig({ isLoader: false });
        }
      },
      err => {
        this.configService.setConfig({ isLoader: false });
        console.error(err);
      }
    );
  }
  getCapWithRank() {
    this.configService.setConfig({ isLoader: true });
    this.http
      .get(`${environment.baseurl}/capabilityscoredata/capability-rank`)
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
          this.fCapabilities = [...this.capPerform, ...this.capTransform, ...this.capEnergise];
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
          console.log(res);
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
      if (!this.isCircle) {
        this.snapBox.isExpand = { style: -1, strategy: -1 };
      }
      this.clearFilter();
      return;
    }

    this.isHighest = true;
    this.isLowest = false;
    this.isRecommendChecked = false;
    this.rankService.setConfig({ rank: 'highest' });
    if (!this.isCircle) {
      this.snapBox.isExpand = { style: -1, strategy: -1 };
    }
    this.highestRanked();
  }
  changeLowest() {
    if (this.isLowest) {
      this.isLowest = false;
      this.isHighest = false;
      this.isRecommendChecked = false;
      this.rankService.setConfig({ rank: 'lowest' });
      if (!this.isCircle) {
        this.snapBox.isExpand = { style: -1, strategy: -1 };
      }
      this.clearFilter();
      return;
    }
    this.isLowest = true;
    this.isHighest = false;
    this.isRecommendChecked = false;
    this.rankService.setConfig({ rank: 'lowest' });
    if (!this.isCircle) {
      this.snapBox.isExpand = { style: -1, strategy: -1 };
    }
    this.lowestRanked();
  }
  changeRecommendCheck() {
    this.isHighest = false;
    this.isLowest = false;
    this.isRecommendChecked = !this.isRecommendChecked;
    if (!this.isCircle) {
      this.snapBox.isExpand = { style: -1, strategy: -1 };
    }
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
    this.fCapabilities = this.capabilities.filter((o) => o.isRecommended);
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
    this.openSnackBar('View your 9 capabilities on the Growth Leader Framework');
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
    const dialogRef = this.matDialog.open(DetailedReportDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  gotogl360(){
    this.router.navigate(['/gl360/report']);
  }

  onViewChange(value) {

    if(value == 'circle') {
      this.isCircle = true;
    } else {
       this.isCircle = false;
    }

    this.clearFilter();
    this.isHighest = false;
    this.isLowest=  false;
    this.isRecommendChecked = false;
    this.rankChecked = false;
  }
}
