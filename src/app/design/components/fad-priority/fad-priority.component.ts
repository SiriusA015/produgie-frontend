import { ConfigService } from './../../../shared/service/config.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../src/environments/environment';
import { DataService } from '../../service/data.service';
import { MatDialog } from '@angular/material/dialog';
import{SharedDetailedReportComponent} from '../../../../app/shared/components/shared-detailed-report/shared-detailed-report.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeSprintDialogComponent } from '../../../design/components/Notification-Dialog/change-sprint-dialog/change-sprint-dialog.component';
import { DataCheckService } from '../../../shared/service/dataCheck.service';
import { DesignService } from '../../service/design/design.service';

const baseUrl = environment.baseurl;

@Component({
  selector: 'app-fad-priority',
  templateUrl: './fad-priority.component.html',
  styleUrls: ['./fad-priority.component.scss'],
})
export class FadPriorityComponent implements OnInit {
  message: any = {};
  capabilities = [];

  selectedCapability = [];

  shownCapability: Set<number> = new Set([]);
  maxSelection = 3;
  isShowMore = false;
  isPriority = null;
  oldPriority = null;
  assessmentId: any;
  selectedFad: any;
  selectedDevelopment: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private dataCheck: DataCheckService,
    private configService: ConfigService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private designService: DesignService
  ) {}

  ngOnInit(): void {

    this.dataService.sharedMessage.subscribe(
      (message) => (this.message = message)
    );
    this.dataService.nextMessage({
      faddev: false,
      fadfocus: true,
      sprint: false,
      Capability: false,
      behaviour: false,
      outcome: false,
      crew: false,
      frequency: false,
      isConfirm: false,
      show:true,
      routine:false,
      action:false,
      step: 1,
    });
    this.configService.setConfig({ isLoader: true });
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
        this.capabilities = tempList;
        // this.capabilities = res.data.reverse();
        this.getSelectedFad();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  getCapWithRank() {
    this.http.get(`${baseUrl}/capabilityscoredata/capability-rank`).subscribe(
      (res: any) => {
        this.capabilities = res.data.reverse();
        this.getSelectedFad();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  getSelectedFad() {
    this.http.get(`${baseUrl}/selectedfad/get-selected-fad`).subscribe(
      (res1: any) => {
        this.selectedFad = res1.data;
        const selectedId: any[] = this.selectedFad.map((o) => o.capabilityId);

        this.selectedCapability = this.capabilities
          .filter((o) => selectedId.indexOf(o.capability.id) !== -1)
          .map((o) => {
            o.capability.isRecommended = o.isRecommended; // selectedId.indexOf(o.capability.id) !== -1
            return o.capability;
          })
          .reverse();

        if (this.selectedCapability.length > 0) {
          const priorityFad = this.selectedFad.find((o) => o.isPriority);
          this.isPriority = priorityFad ? priorityFad.capabilityId : null;
          this.oldPriority = this.isPriority;
          if (this.isPriority) {
            this.dataService.nextMessage({ fadfocus: true });
          }
        }
        this.configService.setConfig({ isLoader: false });
      },
      (err1) => {
        console.log(err1);
      }
    );
  }

  setPriority(id) {
    this.isPriority = id;
    this.designService.configureSprint({priority: this.isPriority});
    this.dataService.nextMessage({ fadfocus: true });
  }

  public back() {
    this.designService.configureSprint({priority: this.isPriority});
    this.router.navigate(['/design/fad']);
  }

  updateFad() {
    if (this.isPriority && this.isPriority == this.oldPriority) {
      this.designService.configureSprint({priority: this.isPriority});
      this.router.navigate(['/design/sprint-configure']);
      return;
    }
    if (this.isPriority) {
      if (!this.message.modalState){
        this.notifications()
      }else{
        this.configService.setConfig({ isLoader: true });
        const payload = {
          fadId: this.isPriority,
        };

        this.http.patch(`${baseUrl}/selectedfad/update-fad`, payload).subscribe(
          (res: any) => {
            if (res.status === 200) {
              this.router.navigate(['/design/sprint-configure']);
            }
            this.configService.setConfig({ isLoader: false });
          },
          (err) => console.log(err)
        );
      }

    }
  }

  saveFad() {
    if (this.isPriority) {
      if (this.isPriority != this.oldPriority) {
        {this._snackBar.open('Please reset next pages', '', {
          duration: 3000,
        });}
      }else{
        this.router.navigate(['/design/sprint-configure']);
      }
    }else{
      {this._snackBar.open('Select any one these Priorities for your Development', '', {
        duration: 3000,
      });}
    }
  }

  showDescription(id: number) {
    if (this.shownCapability.has(id)) {
      this.shownCapability.delete(id);
    } else {
      this.shownCapability.add(id);
    }
  }

  expandAll() {
    // if (this.shownCapability.size === this.selectedCapability.length) {
    //   this.shownCapability.clear();
    // } else {
      this.shownCapability = new Set(this.selectedCapability.map((o) => o.id));
    // }
  }

  showMore() {
    this.isShowMore = !this.isShowMore;
  }
  openDetailsDialog(fad) {
    const dialogRef = this.dialog.open(SharedDetailedReportComponent, {
      width: '40vw',
      height: 'calc(100vh - 76px)',
      position: { right: '0', top: '76px' },
      data: fad,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  notifications() {
    const dialogRef = this.dialog.open(ChangeSprintDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "close"){return}
      this.configService.setConfig({ isLoader: true });
      const payload = {
        fadId: this.isPriority,
      };

      this.http.patch(`${baseUrl}/selectedfad/update-fad`, payload).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.dataService.nextMessage({ isResetDesignEdit: true, modalState: true });
            this.router.navigate(['/design/sprint-configure']);
          }
          this.configService.setConfig({ isLoader: false });
        },
        (err) => console.log(err)
      );
    });
  }
}
