import { ConfigService } from './../../../shared/service/config.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EditEventDialogComponent } from './../modals/edit-event-dialog/edit-event-dialog.component';
import { ViewEventDialogComponent } from './../modals/view-event-dialog/view-event-dialog.component';
import { AddEventDialogComponent } from './../modals/add-event-dialog/add-event-dialog.component';
import { OverLayService } from './../../service/over-lay.service';
import * as moment from 'moment';
import {
  Component,
  OnInit,
  Inject,
  ViewContainerRef,
  ViewChild,
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

const baseUrl = environment.baseurl;

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
})
export class RoadmapComponent implements OnInit {
  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };
  userSprint: any;
  assessmentId: any;
  sprintId: any;
  actions: Action[] = [];
  data = [0, 14, 28];
  selectedActions: Action[] = [];
  dialogData: any;
  isSprintOption = false;
  daysArr = Array(14)
    .fill(1)
    .map((x, i) => x + i);
  sprintDay;
  event = [];
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.getUserSprint();
    // this.getAssessment();
  }

  getUserSprint() {
    this.http.get(`${baseUrl}/usersprint/get-usersprint`).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.userSprint = res.data[0];
          this.data = Array(this.userSprint.duration / 2)
            .fill(1)
            .map((x, i) => 14 * i);
          this.sprintDay =  moment(new Date()).diff(moment(this.userSprint.datetimeFrom), 'days');
          this.getselectedactions();
        }
        this.configService.setConfig({ isLoader: false });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getselectedactions() {
    this.configService.setConfig({ isLoader: true });
    this.http
      .get(
        `${baseUrl}/actionroadmap/get-roadmap-activity`
      )
      .subscribe(
        // this.http.get(`${baseUrl}/sprint/abo?sprint=${this.sprintId}`).subscribe(
        (res: any) => {
          console.log(res.data);
          this.selectedActions = res.data.map((o) => {
            let status = 'UNTOUCHED';
            let commencedDay = null;
            if (o.roadmap) {
              status = o?.roadmap?.isFinished ?  'COMPLETED' : 'PENDING';
              commencedDay = moment(this.userSprint.datetimeFrom).diff(moment(o.roadmap.createdAt), 'days');
            }
            return {
              ...o.action,
              selectedActionId: o.selectedActionId,
              status,
              commencedDay,
              activities: {
                9: [{ id: 1, title: 'event_title', icon: 'call' }],
                12: [{ id: 1, title: 'event_title', icon: 'call' }],
                13: [
                  { id: 5, title: 'event_title5', icon: 'call' },
                  { id: 7, title: 'event_title7', icon: 'mail' },
                ],
                27: [{ id: 1, title: 'event_title', icon: 'call' }],
              },
            };
          });
          console.log(this.selectedActions);
          this.configService.setConfig({ isLoader: false });
        },
        (err) => console.log(err)
      );
  }
  getabo() {
    this.configService.setConfig({ isLoader: true });
    // this.http.get(`${baseUrl}/selectedaction?filter=` + JSON.stringify({assessmentId: this.assessmentId})).subscribe(
    this.http.get(`${baseUrl}/sprint/abo?sprint=${this.sprintId}`).subscribe(
      (res: any) => {
        this.getselectedactions();
        this.actions = res.message.action;
        this.configService.setConfig({ isLoader: false });
      },
      (err) => console.log(err)
    );
  }
  getAssessment() {
    const filterObject = {
      clientId: 1,
      userId: 1,
    };
    this.http
      .get(`${baseUrl}/glaassessment?filter=` + JSON.stringify(filterObject))
      .subscribe(
        (res: any) => {
          this.assessmentId = res.data[0].id;
          this.http
            .get(
              `${baseUrl}/usersprint?filter=` +
                JSON.stringify({ assessmentId: this.assessmentId })
            )
            .subscribe(
              (res2: any) => {
                if (res2.data.length > 0) {
                  this.sprintId = res2.data[0].sprintId;
                  this.getabo();
                }
                this.configService.setConfig({ isLoader: false });
              },
              (err1) => {
                console.log(err1);
              }
            );
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getLenght(object) {
    console.log(object);

    console.log(Object.keys(object).length);
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
      data: { day, action },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        const event: any = Object.values(result.data);
        console.log(event);
      }
    });
  }
  openViewDialog(selectedDay, event, action) {
    const day = selectedDay - this.sprintDay;
    const dialogRef = this.dialog.open(ViewEventDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      data: { day, event, action },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  doesExist(key, obj) {
    return key in obj;
  }
}
