import { SelectActionDialogComponent } from './../select-action-dialog/select-action-dialog.component';
import { Action } from './../../../../../models/Action';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { CustomValidators } from 'ngx-custom-validators';
import { environment } from 'src/environments/environment';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import * as _ from 'lodash';
import { SelectActivityDialogComponent } from '../select-activity-dialog/select-activity-dialog.component';
import { AddStakeholderDialogComponent } from '../add-stakeholder-dialog/add-stakeholder-dialog.component';
import { SelectStakeholderDialogComponent } from '../select-stakeholder-dialog/select-stakeholder-dialog.component';
import { SelectCrewDialogComponent } from '../select-crew-dialog/select-crew-dialog.component';

@Component({
  selector: 'app-add-event-calendar-dialog',
  templateUrl: './add-event-calendar-dialog.component.html',
  styleUrls: ['./add-event-calendar-dialog.component.scss'],
})
export class AddEventCalendarDialogComponent implements OnInit {
  loadCounter = 0;
  actionsSelected: Action[] = [];
  meetingType = 'online';
  selectedActivity = { code: 'SA', title: 'Select Activity' };
  selectedAction = { id: 0, label: 'Select Action' };
  isCustom = false;
  activities: any[] = [
    { code: 'ACS', title: 'Align & Communicate Action With Stakeholder' },
    { code: 'ESC', title: 'Engage With Sprint Crew Member(s)' },
    { code: 'SDL', title: 'Self Directed Learning' },
    { code: 'FSL', title: 'Formal/ Structured Learning' },
    { code: 'OTH', title: 'Other' },
  ];
  stakeholder = [];
  sprintCrew = [];
  selectedStakeHolder: Set<number> = new Set([]);
  selectedCrew: Set<number> = new Set([]);
  activityStakeHolder = [];
  activityCrew = [];
  stakeholderForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, CustomValidators.email]),
  });

  eventForm = new FormGroup({
    actionType: new FormControl(null, Validators.required),
    meetingType: new FormControl('online', Validators.required),
    meeting: new FormControl(null),
    // tslint:disable-next-line:max-line-length
    scheduleStart: new FormControl(
      moment(
        moment(this.data.day).format('YYYY-MM-DD') + ' 09:00 AM',
        'YYYY-MM-DD hh:mm A'
      ).toISOString(),
      Validators.required
    ),
    // tslint:disable-next-line:max-line-length
    scheduleEnd: new FormControl(
      moment(
        moment(this.data.day).format('YYYY-MM-DD') + ' 10:00 AM',
        'YYYY-MM-DD hh:mm A'
      ).toISOString(),
      Validators.required
    ),
    description: new FormControl(null),
  });

  assessmentId: any;
  date;

  meetingStart = '09:00 AM';
  meetingEnd = '10:00 AM';

  // for modals from below
  showAction = false;
  showSelectStakeHolder = false;
  showSelectCrew = false;
  showActivity = false;
  showStakeHolder = false;
  selectedDate;
  datePickerConfig = {};

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.datePickerConfig = {
      openOnFocus: false,
      weekDayFormat: 'dd',
      min: moment(moment().add(1, 'd')).format('DD-MM-YYYY'),
    };
    this.date = moment(moment(this.data.day).format('YYYY-MM-DD') + ' 00:00 AM', 'YYYY-MM-DD hh:mm A');
    if (this.data.isEdit) {
      this.date = moment(
        moment(this.data.data.day).format('YYYY-MM-DD') + ' 00:00 AM', 'YYYY-MM-DD hh:mm A'
      );
      const eventData = this.data.data.event;
      console.log(eventData);
      this.isCustom = eventData.isCustom;
      if (
        eventData.eventType.code !== 'WC' &&
        eventData.eventType.code !== 'FF'
      ) {
        eventData.action = {
          ...eventData.action,
          isCustom: eventData.isCustom,
        };
        this.selectAction(eventData.action);
        this.selectActivity(
          this.activities[
            _.findIndex(
              this.activities,
              (o) => o.code === eventData.eventType.code
            )
          ]
        );
        this.meetingType = eventData.eventDetails.isOnline
          ? 'online'
          : 'offline';
        this.eventForm.setValue({
          actionType: this.selectedActivity.code,
          meetingType: eventData.eventDetails.isOnline ? 'online' : 'offline',
          meeting: eventData.eventDetails.isOnline
            ? eventData.eventDetails.meetingUrl
            : eventData.eventDetails.address,
          scheduleStart: moment(
            moment(eventData.eventDetails.meetingTimeFrom).format(
              'YYYY-MM-DD hh:mm A'
            )
          ).toISOString(),
          scheduleEnd: moment(
            moment(eventData.eventDetails.meetingTimeTo).format(
              'YYYY-MM-DD hh:mm A'
            )
          ).toISOString(),
          description: eventData.eventDetails.description
            ? eventData.eventDetails.description
            : null,
        });
        this.getCrewStakeholder(eventData.eventDetails.id);
      }
      this.meetingStart = moment(eventData.eventDetails.meetingTimeFrom)
        .format('hh:mm A')
        .toString();
      this.meetingEnd = moment(eventData.eventDetails.meetingTimeTo)
        .format('hh:mm A')
        .toString();
      console.log(this.selectedAction);
    }
    this.getselectedactions();
    this.getSprintCrew();
    console.log(this.eventForm.value);

  }

  getselectedactions() {
    this.loadCounter += 1;
    this.http
      .get(`${environment.baseurl}/actionroadmap/get-roadmap-activity`)
      .subscribe(
        (res: any) => {
          this.actionsSelected = res.data.map((o) => {
            let status = 'UNTOUCHED';
            if (o.roadmap) {
              status = o?.roadmap?.isFinished ? 'COMPLETED' : 'PENDING';
            }
            return {
              ...o.action,
              ...o.customAction,
              isCustom: o.isCustom,
              selectedActionId: o.selectedActionId,
              status,
            };
          });
          this.actionsSelected = this.actionsSelected.filter(
            (o) => o.status === 'PENDING'
          );
          this.loadCounter -= 1;
        },
        (err) => console.log(err)
      );
  }
  getSprintCrew() {
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/sprintcrew/get-sel`).subscribe(
      (res: any) => {
        this.sprintCrew = res.data;
        this.loadCounter -= 1;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCrewStakeholder(id) {
    this.http
      .get(
        `${environment.baseurl}/actionactivity/crew-stakeholder/` +
          id
      )
      .subscribe(
        (res: any) => {
          console.log(res.data);
          res.data.stakeHolder.map((o) => {
            this.selectedStakeHolder.add(o.id);
            this.activityStakeHolder.push(o);
          });
          res.data.supportCrew.map((o) => {
            this.selectedCrew.add(o.id);
            this.activityCrew.push(o);
          });
        },
        (err) => console.log(err)
      );
  }
  public onValChange(val: string) {
    this.meetingType = val;
    this.eventForm.get('meetingType').setValue(this.meetingType);
  }

  showActionChange() {
    if (this.loadCounter > 0) {
      return;
    }
    const dialogRef = this.dialog.open(SelectActionDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      panelClass: 'custom-menu-container-bottom',
      data: {
        selectedAction: this.selectedAction,
        actions: this.actionsSelected,
      },
      position: { left: '0', bottom: '0' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && !result.isCancel) {
        this.selectAction(result.selected);
      }
    });
  }
  showActivityChange() {
    const dialogRef = this.dialog.open(SelectActivityDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      panelClass: 'custom-menu-container-bottom',
      data: {
        selectedActivity: this.selectedActivity,
        activities: this.activities,
      },
      position: { left: '0', bottom: '0' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && !result.isCancel) {
        this.selectActivity(result.selected);
      }
    });
  }
  showStakeholderChange() {
    // this.showStakeHolder = !this.showStakeHolder;
    const dialogRef = this.dialog.open(AddStakeholderDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      // height: '30vh',
      panelClass: 'custom-menu-container-bottom',
      data: { action: this.selectedAction },
      position: { left: '0', bottom: '0' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && !result.isCancel) {
        this.stakeholder = result.added;
        this.addToSelectedStakeHolder(result.added[0]);
        this.addToActivityStakeholder();
        console.log(this.selectedStakeHolder);
        console.log(this.activityStakeHolder);
      }
    });
  }
  showSelectStakeholderChange() {
    // this.showSelectStakeHolder = !this.showSelectStakeHolder;
    const dialogRef = this.dialog.open(SelectStakeholderDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      // height: '30vh',
      panelClass: 'custom-menu-container-bottom',
      data: { stakeholder: this.stakeholder, selected: this.selectedStakeHolder },
      position: { left: '0', bottom: '0' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && !result.isCancel) {
        this.selectedStakeHolder = result.selected;
        this.addToActivityStakeholder();
      }
    });
  }
  showSelectCrewChange() {
    const dialogRef = this.dialog.open(SelectCrewDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      // height: '30vh',
      panelClass: 'custom-menu-container-bottom',
      data: { crew: this.sprintCrew, selected: this.selectedCrew },
      position: { left: '0', bottom: '0' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && !result.isCancel) {
        this.selectedCrew = result.selected;
        this.addToActivityCrew();
      }
    });
  }
  selectAction(action) {
    console.log(action);
    this.isCustom = action.isCustom;
    this.showAction = false;
    this.selectedAction = action;
    this.getStakeHolder(action.id, action.isCustom);
    this.activityCrew = [];
    this.activityStakeHolder = [];
    this.selectedCrew.clear();
    this.selectedStakeHolder.clear();
  }
  selectActivity(activity) {
    this.showActivity = false;
    this.selectedActivity = activity;
    this.resetEventForm();
    this.activityCrew = [];
    this.activityStakeHolder = [];
    this.selectedCrew.clear();
    this.selectedStakeHolder.clear();
    if (activity.code === 'FSL') {
      this.eventForm.get('meetingType').clearValidators();
      this.eventForm.get('meeting').clearValidators();
    }
  }

  resetEventForm() {
    this.eventForm.reset();
    this.eventForm.setValue({
      actionType: this.selectedActivity.code,
      meetingType: 'online',
      meeting: null,
      scheduleStart: moment(
        moment(this.data.day, 'd').format('YYYY-MM-DD') + ' 09:00 AM',
        'YYYY-MM-DD hh:mm A'
      ).toISOString(),
      scheduleEnd: moment(
        moment(this.data.day, 'd').format('YYYY-MM-DD') + ' 10:00 AM',
        'YYYY-MM-DD hh:mm A'
      ).toISOString(),
      description: null,
    });
  }

  onNoClick(): void {
    this.dialogRef.close({ isCancel: true, data: null });
  }
  stopPropagation(event) {
    event.stopPropagation();
  }
  getStakeHolder(actionId, isCustom) {
    if (isCustom) {
      this.http
        .get(`${environment.baseurl}/actionstakeholder/get-custom/${actionId}`)
        .subscribe(
          (res: any) => {
            this.stakeholder = res.data.reverse();
          },
          (err) => console.log(err)
        );
    } else {
      this.http
        .get(`${environment.baseurl}/actionstakeholder/get/${actionId}`)
        .subscribe(
          (res: any) => {
            this.stakeholder = res.data.reverse();
          },
          (err) => console.log(err)
        );
    }
  }
  storeStakeHolder() {
    const payload = this.stakeholderForm.value;
    payload.actionId = this.selectedAction.id;
    payload.isCustom = this.isCustom;
    this.http
      .post(
        `${environment.baseurl}/actionstakeholder/add-sel-activity`,
        payload
      )
      .subscribe(
        (res: any) => {
          this.stakeholder = res.data;
          this.addToSelectedStakeHolder(res.data[0]);
          this.addToActivityStakeholder();
        },
        (err) => console.log(err)
      );
    this.showStakeHolder = false;
  }
  getStartTime(time) {
    this.meetingStart = time;
    const startTime = moment(
      moment(this.data.date).format('YYYY-MM-DD') + ' ' + time,
      'YYYY-MM-DD hh:mm A'
    ).toISOString();
    this.eventForm.get('scheduleStart').setValue(startTime);
  }
  getEndTime(time) {
    this.meetingEnd = time;
    const endTime = moment(
      moment(this.data.date).format('YYYY-MM-DD') + ' ' + time,
      'YYYY-MM-DD hh:mm A'
    ).toISOString();
    this.eventForm.get('scheduleEnd').setValue(endTime);
  }
  storeEvent() {
    this.loadCounter += 1;
    const payload = this.eventForm.value;
    console.log(payload);
    let SprintCrew = null;
    let StakeHolder = null;
    if (this.selectedActivity.code === 'ACS') {
      StakeHolder = this.activityStakeHolder.map((o) => o.id);
    } else if (this.selectedActivity.code === 'ESC') {
      SprintCrew = this.activityCrew.map((o) => o.id);
    }
    const finalPayload = {
      actionType: this.selectedActivity.code,
      actionId: this.selectedAction.id,
      isCustom: this.isCustom,
      date: this.date.toISOString(),
      timeFrom: payload.scheduleStart,
      timeTo: payload.scheduleEnd,
      isOnline: payload.meetingType === 'online' ? true : false,
      address: payload.meeting === null ? '--' : payload.meeting,
      link: payload.meeting === null ? '--' : payload.meeting,
      description: payload.description,
      stakeHolder: StakeHolder,
      supportCrew: SprintCrew,
    };
    this.http
      .post(`${environment.baseurl}/actionactivity/add-activity`, finalPayload)
      .subscribe(
        (res: any) => {
          this.loadCounter -= 1;
          this.dialogRef.close({ isCancel: false, data: finalPayload });
        },
        (err) => console.log(err)
      );
  }
  updateEvent() {
    this.loadCounter += 1;
    const wcevent = this.data.data.event;
    let date = moment(wcevent.eventDetails.meetingDate).toISOString();
    // tslint:disable-next-line:max-line-length
    let timeFrom = moment(
      moment(wcevent.eventDetails.meetingDate).format('YYYY-MM-DD') +
        ' ' +
        this.meetingStart,
      'YYYY-MM-DD hh:mm A'
    ).toISOString();
    // tslint:disable-next-line:max-line-length
    let timeTo = moment(
      moment(wcevent.eventDetails.meetingDate).format('YYYY-MM-DD') +
        ' ' +
        this.meetingEnd,
      'YYYY-MM-DD hh:mm A'
    ).toISOString();
    if (this.selectedDate) {
      date = moment(this.selectedDate).toISOString();
      timeFrom = moment(
        moment(this.selectedDate).format('YYYY-MM-DD') +
          ' ' +
          this.meetingStart,
        'YYYY-MM-DD hh:mm A'
      ).toISOString();
      timeTo = moment(
        moment(this.selectedDate).format('YYYY-MM-DD') + ' ' + this.meetingEnd,
        'YYYY-MM-DD hh:mm A'
      ).toISOString();
    }
    const payload = this.eventForm.value;
    let SprintCrew = null;
    let StakeHolder = null;
    if (this.selectedActivity.code === 'ACS') {
      StakeHolder = this.activityStakeHolder.map((o) => o.id);
    } else if (this.selectedActivity.code === 'ESC') {
      SprintCrew = this.activityCrew.map((o) => o.id);
    }
    const finalPayload = {
      actionType: this.selectedActivity.code,
      actionId: this.selectedAction.id,
      isCustom: this.isCustom,
      date,
      timeFrom,
      timeTo,
      isOnline: payload.meetingType === 'online' ? true : false,
      address: payload.meeting === null ? '--' : payload.meeting,
      link: payload.meeting === null ? '--' : payload.meeting,
      description: payload.description,
      stakeHolder: StakeHolder,
      supportCrew: SprintCrew,
    };
    this.http
      .post(
        `${environment.baseurl}/actionactivity/update/` +
          this.data.data.event.eventDetails.id,
        finalPayload
      )
      .subscribe(
        (res: any) => {
          this.loadCounter -= 1;
          this.dialogRef.close({ isCancel: false, data: null });
        },
        (err) => console.log(err)
      );
  }
  updateWC() {
    this.loadCounter += 1;
    const wcevent = this.data.data.event;
    let date = moment(wcevent.eventDetails.meetingDate).toISOString();
    let timeFrom = moment(
      moment(wcevent.eventDetails.meetingDate).format('YYYY-MM-DD') +
        ' ' +
        this.meetingStart,
      'YYYY-MM-DD hh:mm A'
    ).toISOString();
    let timeTo = moment(
      moment(wcevent.eventDetails.meetingDate).format('YYYY-MM-DD') +
        ' ' +
        this.meetingEnd,
      'YYYY-MM-DD hh:mm A'
    ).toISOString();
    if (this.selectedDate) {
      date = moment(this.selectedDate).toISOString();
      timeFrom = moment(
        moment(this.selectedDate).format('YYYY-MM-DD') +
          ' ' +
          this.meetingStart,
        'YYYY-MM-DD hh:mm A'
      ).toISOString();
      timeTo = moment(
        moment(this.selectedDate).format('YYYY-MM-DD') + ' ' + this.meetingEnd,
        'YYYY-MM-DD hh:mm A'
      ).toISOString();
    }
    const payload = {
      actionType: wcevent.eventType.code,
      date,
      timeFrom,
      timeTo,
    };
    this.http
      .post(
        `${environment.baseurl}/actionactivity/update-wc/${wcevent.eventDetails.id}`,
        payload
      )
      .subscribe(
        (res) => {
          this.loadCounter -= 1;
          this.dialogRef.close({ isCancel: false, data: payload });
        },
        (err) => console.error(err)
      );
  }
  clearForm() {
    this.stakeholderForm.reset();
  }
  addToSelectedStakeHolder(sh) {
    if (this.selectedStakeHolder.has(sh.id)) {
      this.selectedStakeHolder.delete(sh.id);
    } else {
      this.selectedStakeHolder.add(sh.id);
    }
  }

  addToActivityStakeholder() {
    this.activityStakeHolder = this.stakeholder.filter((o) => {
      return this.selectedStakeHolder.has(o.id);
    });
    this.showSelectStakeHolder = false;
  }
  addToSelectedCrew(crew) {
    if (this.selectedCrew.has(crew.id)) {
      this.selectedCrew.delete(crew.id);
    } else {
      this.selectedCrew.add(crew.id);
    }
  }

  addToActivityCrew() {
    this.activityCrew = this.sprintCrew.filter((o) => {
      return this.selectedCrew.has(o.id);
    });
    this.showSelectCrew = false;
  }
  changeDate(event) {
    this.selectedDate = moment(event.date).toISOString();
    this.date = this.selectedDate;
  }
}
