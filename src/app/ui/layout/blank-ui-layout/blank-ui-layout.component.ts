import { ConfigService } from 'src/app/shared/service/config.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../design/service/data.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/design/components/Notification-Dialog/confirm-dialog/confirm-dialog.component';
import { DesignstatusConfirmationComponent } from 'src/app/design/components/Notification-Dialog/confirm-dialog/designstatus-confirmation/designstatus-confirmation.component';
import { RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
// import { UntilDestroy } from '@ngneat/until-destroy/lib/until-destroy';

@Component({
  selector: 'app-blank-ui-layout',
  templateUrl: './blank-ui-layout.component.html',
  styleUrls: ['./blank-ui-layout.component.scss'],
})
// @UntilDestroy({ checkProperties: true })
export class BlankUiLayoutComponent implements OnInit {
  reportGenerated;
  triggerData: any;
  isLoader = true;
  message: any = {};
  subscribeMsg;

  routePrefix = '';

  constructor(
    public configService: ConfigService,
    public dataCheck: DataCheckService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.router.getCurrentNavigation().extras.state
    this.dataCheck.getAssessmentTrigger().subscribe(
      (res: any) => {
        if (!res.isAgree) {
          this.router.navigate(['/auth/policy-consent']);
        }
        this.triggerData = res.data;
        // this.reportGenerated = this.triggerData.reportGenerated;
        this.reportGenerated = true;
        this.route.pathFromRoot[1].url.subscribe((val) => {
          this.subscribeMsg = this.dataService.sharedMessage.subscribe(
            (message) => {
              this.routePrefix = val[0].path;
              this.message = message;
              if (
                val[0].path === 'design' &&
                this.triggerData.isDesignComplete
              ) {
                // 
                const dialogRef = this.dialog.open(DesignstatusConfirmationComponent, {
                  disableClose: true,
                  width: '450px',
                  // data: 'isDesignComplete'
                });
                this.router.navigate(['/not-found']);
              } else if (
                val[0].path === 'design' &&
                this.triggerData.isDesignEdit &&
                !this.message.isEdit &&
                !this.message.isResetDesignEdit
              ) {
                this.router.navigate(['/design/sprint-final']);
                []
              } else {
                this.isLoader = false;
              }
            }
          );
        });
      },
      (err) => {
        console.error(err);
        this.isLoader = false;
      }
    );
  }

  // ngOnDestroy() {
  //   this.subscribeMsg.unsubscribe();
  // }
}
