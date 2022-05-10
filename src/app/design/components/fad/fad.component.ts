import { SharedDetailedReportComponent } from 'src/app/shared/components/shared-detailed-report/shared-detailed-report.component';
import { ConfigService } from './../../../shared/service/config.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../../service/data.service';
import * as _ from 'lodash';
import { HelipopperDirective } from '@ngneat/helipopper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeSprintDialogComponent } from '../../../design/components/Notification-Dialog/change-sprint-dialog/change-sprint-dialog.component';
import { DataCheckService } from '../../../shared/service/dataCheck.service';
import { DesignService } from './../../service/design/design.service';

const baseUrl = environment.baseurl;

@Component({
  selector: 'app-fad',
  templateUrl: './fad.component.html',
  styleUrls: ['./fad.component.scss'],
})
export class FadComponent implements OnInit {
  @ViewChild('tooltip') tooltip: HelipopperDirective;
  message: any = {};
  capabilities = [];
  recommendedFad = [];
  nonrecommendedFad = [];

  selectedCapability: Set<number> = new Set([]);
  oldSelectedCapability: Set<number> = new Set([]);
  selectedCapabilityIndex: Set<number> = new Set([]);
  shownCapabilityRecommended: Set<number> = new Set([]);
  shownCapabilityNonRecommended: Set<number> = new Set([]);

  maxSelection = 3;
  isShowMore = false;
  selected: any[] = [];
  assessmentId: any;
  allcapabilities: any;
  show: boolean = false;
  disableFlag: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private dataCheck: DataCheckService,
    public dialog: MatDialog,
    private configService: ConfigService,
    private _snackBar: MatSnackBar,
    private designService: DesignService
  ) {
    this.shownCapabilityRecommended = new Set(
      this.recommendedFad.map((o) => o.capability.id)
    );
  }

  ngOnInit(): void {

    this.dataService.sharedMessage.subscribe(
      (message) => (this.message = message)
    );

    this.expandAllRecommended();
    this.dataService.nextMessage({
      faddev: true,
      fadfocus: false,
      sprint: false,
      Capability: false,
      behaviour: false,
      outcome: false,
      crew: false,
      frequency: false,
      isConfirm: false,
      step: 1,
      show: true,
      routine: false,
      action: false,
      modalState: false
    });
    this.getAssessmentTrigger();
  }

  getAssessmentTrigger() {

    this.dataCheck.getAssessmentTrigger().subscribe(
      (res: any) => {
          let surveyCompleted = res.data['styleSurveyCompleted'];
          if (!surveyCompleted){
            this.getCapabilities()
          }else{
            this.getCapWithRank();
          }
      },
      (err) => console.error(err)
    );
  }

  getCapabilities() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${baseUrl}/capability`).subscribe(
      (res: any) => {
        let tempList = []
        res.data.map(item=>{
          tempList.push({capability: item})
        })
        this.nonrecommendedFad = tempList;
        this.getSelectedFad();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  getCapWithRank() {
    this.http.get(`${environment.baseurl}/capabilityscoredata/capability-rank`)
      .subscribe(
        (res: any) => {
          this.capabilities = res.data;
          this.capabilities = _.orderBy(this.capabilities, (o) => o.rank);
          this.recommendedFad = this.capabilities.filter(
            (o) => o.isRecommended
          );
          this.nonrecommendedFad = this.capabilities.filter(
            (o) => !o.isRecommended
          );
          this.getSelectedFad();
        },
        (err) => console.log(err)
      );
  }
  showTooltip() {
    if (this.selectedCapability?.size < 3) {
      this.tooltip.show();
    } else {
      this.tooltip.hide();
    }
  }

  getSelectedFad() {
    this.http.get(`${baseUrl}/selectedfad/get-selected-fad`).subscribe(
      (res1: any) => {
        this.selectedCapability = new Set(res1.data.map((o) => o.capabilityId));
        this.oldSelectedCapability = new Set(res1.data.map((o) => o.capabilityId));

        this.capabilities.forEach((o, i) => {
          if (this.selectedCapability.has(o.id)) {
            this.selectedCapabilityIndex.add(i);
          }
        });
        if (this.selectedCapability.size === this.maxSelection) {
          this.dataService.nextMessage({ faddev: true });
        }
        this.configService.setConfig({ isLoader: false });
      },
      (err1) => {
        console.log(err1);
      }
    );
  }

  selectCapability(id: number, index: number) {
    if (this.selectedCapability.size === this.maxSelection) {
      if (this.selectedCapability.has(id)) {
        this.selectedCapability.delete(id);
        this.selectedCapabilityIndex.delete(index);
      }
    } else {
      if (this.selectedCapability.has(id)) {
        this.selectedCapability.delete(id);
      } else {
        this.selectedCapability.add(id);
      }

      if (this.selectedCapabilityIndex.has(index)) {
        this.selectedCapabilityIndex.delete(index);
      } else {
        this.selectedCapabilityIndex.add(index);
      }
    }
    if (this.selectedCapability.size === this.maxSelection) {
      this.dataService.nextMessage({ faddev: true });
    }

    let tempSelected : boolean = false;
    this.oldSelectedCapability.forEach((o)=>{
      if (!this.selectedCapability.has(o)) { tempSelected = true; }
    })

    if (!tempSelected && this.oldSelectedCapability.size != 0){
      this.disableFlag = false;
    }else{
      this.disableFlag = true;
    }

    this.designService.configureSprint({selectedCapability: Array.from(this.selectedCapability)});
  }

  showDescriptionRecommended(id: number) {
    if (this.shownCapabilityRecommended.has(id)) {
      this.shownCapabilityRecommended.delete(id);
    } else {
      this.shownCapabilityRecommended.add(id);
    }
  }

  showDescriptionNonRecommended(id: number) {
    if (this.shownCapabilityNonRecommended.has(id)) {
      this.shownCapabilityNonRecommended.delete(id);
    } else {
      this.shownCapabilityNonRecommended.add(id);
    }
  }

  expandAllRecommended() {
    this.shownCapabilityRecommended = new Set(
      this.recommendedFad.map((o) => o.capability.id)
    );
  }
  expandAllnonRecommended() {
    if (
      this.shownCapabilityNonRecommended.size === this.nonrecommendedFad.length
    ) {
      this.shownCapabilityNonRecommended.clear();
    } else {
      this.shownCapabilityNonRecommended = new Set(
        this.nonrecommendedFad.map((o) => o.capability.id)
      );
    }
  }

  showMore() {
    this.isShowMore = !this.isShowMore;
  }

  storeFad() {
    let tempSelected : boolean = false;
    this.oldSelectedCapability.forEach((o)=>{
      if (!this.selectedCapability.has(o)) { tempSelected = true; }
    })

    if (!tempSelected && this.oldSelectedCapability.size != 0){
      this.disableFlag = true;
      this.configService.setConfig({ isLoader: false });
      this.designService.configureSprint({selectedCapability: Array.from(this.selectedCapability)});
      this.router.navigate(['/design/fad-priority']);
      return;
    }

    if (this.selectedCapability.size >= 3) {
      this.notifications();
    }
  }

  saveFad() {
    if (!this.disableFlag){
      this.configService.setConfig({ isLoader: false });
      this.router.navigate(['/design/sprint-final']);
    }else{
      this._snackBar.open('Please reset next pages', '', {
        duration: 3000,
      });
    }
  }

  openDetailsDialog(fad) {
    const dialogRef = this.dialog.open(SharedDetailedReportComponent, {
      width: '40vw',
      height: 'calc(100vh - 76px)',
      position: { right: '0', top: '76px' },
      data: fad,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  notifications() {
    const dialogRef = this.dialog.open(ChangeSprintDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "close"){
        return
      }
      this.configService.setConfig({ isLoader: false });
      this.selected = this.capabilities.filter((o) =>
        this.selectedCapability.has(o.id)
      );

      this.http
        .post(`${baseUrl}/selectedfad/add-fad`, {
          capabilityId: Array.from(this.selectedCapability),
        })
        .subscribe(
          (res: any) => {
            if (res.status === 200) {

              this.configService.setConfig({ isLoader: false });
              this.dataService.nextMessage({ isResetDesignEdit: true, modalState: true });
              this.designService.configureSprint({selectedCapability: Array.from(this.selectedCapability)});
              this.router.navigate(['/design/fad-priority']);
            }
            console.log(res);
          },
          (err) => console.log(err)
        );
      });
  }

  gotoGLA(){
    this.router.navigate(['/explore/aboutme']);
  }
}
