import { Router } from '@angular/router';
import { ExtendDialogComponent } from './modals/extend-dialog/extend-dialog.component';
import { ConfigService } from './../../../shared/service/config.service';
import { HttpClient } from '@angular/common/http';
import { map, takeUntil } from 'rxjs/operators';
import { EditEventDialogComponent } from './../modals/edit-event-dialog/edit-event-dialog.component';
import { ViewEventDialogComponent } from './../modals/view-event-dialog/view-event-dialog.component';
import { AddEventDialogComponent } from './../modals/add-event-dialog/add-event-dialog.component';
import { OverLayService } from './../../service/over-lay.service';
import { UtilsService } from './../../../shared/utils/utils.service';
import * as moment from 'moment';
import {
  Component,
  OnInit,
  Inject,
  ViewContainerRef,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Action } from 'src/models/Action';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import * as _ from 'lodash';
import { WcNotificationDialogComponent } from '../modals/wc-notification-dialog/wc-notification-dialog.component';
import { Subject } from 'rxjs';
import { AddEventComponent } from '../add-event/add-event.component';
import { ViewEventDataComponent } from '../view-event-data/view-event-data.component';

const baseUrl = environment.baseurl;

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
})
export class RoadmapComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true,
    },
  };
  isStop = false;
  isFinished = false;
  userSprint: any;
  assessmentId: any;
  sprintId: any;
  actions: Action[] = [];
  data = [0, 14, 28];
  isEndDate = false;
  selectedActions: Action[] = [];
  dialogData: any;
  isSprintOption = false;
  daysArr = Array(14)
    .fill(1)
    .map((x, i) => x + i);
  sprintDay;
  event = [];
  icons = {
    WC: 'chat',
    FF: 'assignment',
    ACS: 'person',
    ESC: 'group',
    SDL: 'check_circle',
    FSL: 'videocam',
    OTH: 'gamepad',
  };
  colors = {
    WC: 'pg-bg-wc',
    FF: 'pg-bg-ff',
    ACS: 'pg-bg-acs',
    ESC: 'pg-bg-esc',
    SDL: 'pg-bg-sdl',
    FSL: 'pg-bg-fsl',
    OTH: 'pg-bg-oth',
  };

  totalSprintDurationDays = [];
  totalSprintDurationMonths = [];
  dayView = true;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserSprint();
  }
  changeView() {
    this.dayView = !this.dayView;
  }
  getUserSprint() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${baseUrl}/usersprint/get-usersprint`).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.userSprint = res.data[0];
          this.isStop = this.userSprint.isStop;
          this.isFinished = this.userSprint.isFinished;
          // this.isFinished = true;
          if (this.isFinished && !this.userSprint.sprintReviewEndTime) {
            this.router.navigate(['sprint/congratulations']);
          } else {
            this.totalSprintDurationDays = Array(this.userSprint.duration * 7)
              .fill(1)
              .map((x, i) => x + i);
            this.totalSprintDurationMonths = Array(
              Math.ceil(this.userSprint.duration / 4)
            )
              .fill(1)
              .map((x, i) => x + i);
            this.data = Array(Math.ceil(this.userSprint.duration / 2))
              .fill(1)
              .map((x, i) => 14 * i);

            const sprintdifference = UtilsService.calculateSecDiffFromUTCnonAbs(
              this.userSprint.datetimeFrom,
              new Date().toISOString()
            );
            if (sprintdifference <= 0) {
              this.configService.setConfig({ isLoader: false });
              // this.router.navigate(['/sprint/not-started']);
              this.sprintDay = 0;
            } else {
              this.sprintDay =
                UtilsService.calculateDayDiffFromUTC(
                  new Date().toISOString(),
                  this.userSprint.datetimeFrom
                ) + 1;
            }
            if (this.sprintDay === this.userSprint.duration * 7) {
              this.isEndDate = true;
            }
          }
          this.getselectedactions();
        } else {
          this.configService.setConfig({ isLoader: false });
        }
      },
      (err) => {
        console.error(err);
        this.configService.setConfig({ isLoader: false });
      }
    );
  }

  getselectedactions() {
    this.configService.setConfig({ isLoader: true });
    this.http
      .get(`${baseUrl}/actionroadmap/get-roadmap-activity`)
      .subscribe((res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.selectedActions = res.data.map((o) => {
          let status = 'UNTOUCHED';
          let commencedDay = null;
          let finishedDay = null;
          if (o.roadmap) {
            status = o?.roadmap?.isFinished ? 'COMPLETED' : 'PENDING';
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:max-line-length
            commencedDay =
              UtilsService.calculateSprintDay(
                o.roadmap.startedAt,
                this.userSprint.datetimeFrom
              ) + 1;
            // tslint:disable-next-line:max-line-length
            finishedDay =
              UtilsService.calculateDayDiffFromUTC(
                o.roadmap.finishedAt,
                this.userSprint.datetimeFrom
              ) + 1;
          }
          const activities = {};
          if (o?.activityByDate) {
            o.activityByDate.map((obj) => {
              activities[
                UtilsService.calculateDayDiffFromUTC(
                  this.userSprint.datetimeFrom,
                  obj.date
                )+1//previously it was +1
              ] = obj.activity.map((act) => {
                return {
                  id: act.activityDetails.id,
                  title: act.activityType.title,
                  icon: this.icons[act.activityType.code],
                  color: this.colors[act.activityType.code],
                  details: act.activityDetails,
                  type: act.activityType,
                };
              });
            });
          }
          return {

            ...o.action,
            ...o.customAction,
            isCustom: o.isCustom,
            selectedActionId: o.selectedActionId,
            status,
            commencedDay,
            finishedDay,
            activities,
          };
        });


      });
  }

  commenceAction(actionId, isCustom) {
    this.configService.setConfig({ isLoader: true });
    const payload = {
      actionId,
      isCustom,
    };
    this.http
      .post(`${baseUrl}/actionroadmap/add-roadmap`, payload)
      .subscribe((res: any) => {
        this.getselectedactions();
      });
  }
  completeAction(actionId, isCustom) {
    this.configService.setConfig({ isLoader: true });
    this.http
      .patch(`${baseUrl}/actionroadmap/finish`, { actionId, isCustom })
      .subscribe((res: any) => {
        this.getselectedactions();
      });
  }
  getLenght(object) {
    return Object.keys(object).length === 0;
  }
  SprintOption(): void {
    this.isSprintOption = !this.isSprintOption;
  }
  openAddDialog(selectedDay, action) {
    const day = selectedDay - this.sprintDay;
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      data: { isEdit: false, data: { day, action } },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        const event: any = Object.values(result.data);
        this.getselectedactions();
      }
    });
  }
  openViewDialog(selectedDay, event, action) {
   if (event === 'weekly-checkin') {
      event = {
        title: event,
        type: {
          code: 'WC',
        },
      };
    } else if (event === 'feedback') {
      event = {
        title: event,
        type: {
          code: 'FF',
        },
      };
    }
    const day = selectedDay - this.sprintDay;

    const dialogRef = this.dialog.open(ViewEventDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      data: { day, event, action, isStop: this.isStop },
      panelClass: 'custom-dialog-container',
    });
    // const dialogRef = this.dialog.open(ViewEventDataComponent, {
    //   width: '100%',
    //   maxWidth: '100%',
    //   height: '100%',
    //   maxHeight: '100%',
    //   data: { day, event, action, isStop: this.isStop },
    //   // panelClass: 'custom-dialog-container',
    // });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.getselectedactions();
      }
    });
  }
  doesExist(key, obj) {
    return key in obj;
  }
  // openwcNotificationDialog() {
  //   const dialogRef = this.dialog.open(WcNotificationDialogComponent, {
  //     width: '100%',
  //     maxWidth: '100%',
  //     position: { left: '0', bottom: '50px' },
  //     panelClass: 'custom-dialog-container',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(result);
  //     // if (!result.isCancel && result.added) {
  //     //   this.getselectedactions();
  //     // }
  //   });
  // }
  openExtendSprint() {
    const dialogRef = this.dialog.open(ExtendDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      position: { left: '0', bottom: '50px' },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel && result.added) {
        this.getselectedactions();
      }
    });
  }
  stopSprint() {
    this.configService.setConfig({ isLoader: true });
    this.http
      .get(`${environment.baseurl}/usersprint/stop`)
      .subscribe((res: any) => {
        this.isSprintOption = false;
        this.getUserSprint();
        // this.configService.setConfig({ isLoader: false });
      });
  }
}
