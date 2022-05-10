import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CustomValidators } from 'ngx-custom-validators';
import { environment } from 'src/environments/environment';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';

@Component({
  selector: 'app-sprint-review-event-dialog',
  templateUrl: './sprint-review-event-dialog.component.html',
  styleUrls: ['./sprint-review-event-dialog.component.scss']
})
export class SprintReviewEventDialogComponent implements OnInit {
  meetingType = 'online';
  actionType = 'REV';
  stakeholder = [];
  selectedDate;
  sprintCrew = [];
  selectedStakeHolder: Set<number> = new Set([]);
  selectedCrew: Set<number> = new Set([]);
  activityStakeHolder = [];
  activityCrew = [];
  datePickerConfig = {};

  stakeholderForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, CustomValidators.email]),
  });



  assessmentId: any;
  date = moment(
    moment().add(1, 'd').format('YYYY-MM-DD') +
      ' 00:00 AM',
    'YYYY-MM-DD hh:mm A'
  ).toISOString();
  minDate;

  meetingStart = null;
  meetingEnd = null;

  // for modals from below
  showSelectStakeHolder = false;
  showSelectCrew = false;
  showActivity = false;
  showStakeHolder = false;
  eventForm: FormGroup;
  eventTitle= "";
  errorMsg: string;

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    if(this.actionType == 'REV'){
      this.eventTitle = "Final Sprint Review";
    }
  }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      meetingType: new FormControl('online', Validators.required),
      meeting: new FormControl(null, Validators.required),
      // tslint:disable-next-line:max-line-length
      scheduleStart: new FormControl(
        moment(
          moment().add(1, 'd').format('YYYY-MM-DD') +
            ' 09:00 AM',
          'YYYY-MM-DD hh:mm A'
        ).toISOString(),
        Validators.required
      ),
      // tslint:disable-next-line:max-line-length
      scheduleEnd: new FormControl(
        moment(
          moment().add(1, 'd').format('YYYY-MM-DD') +
            ' 09:30 AM',
          'YYYY-MM-DD hh:mm A'
        ).toISOString(),
        Validators.required
      ),
      description: new FormControl(null),
      eventTitle: new FormControl(this.eventTitle)
    });
    this.datePickerConfig = {
      openOnFocus: false,
      weekDayFormat: 'dd',
      min: moment(moment().add(0, 'd')).format('DD-MM-YYYY')
    };
    this.getStakeHolder();
    this.getSprintCrew();
  }
  getSprintCrew() {
    this.http.get(`${environment.baseurl}/sprintcrew/get-sel`).subscribe(
      (res: any) => {
        console.log(res.data);
        this.sprintCrew = res.data;
        this.getStakeHolder();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getStakeHolder(){
    this.http.get(`${environment.baseurl}/actionstakeholder/get`).subscribe(
      (res: any) => {
        this.stakeholder = res.data;
      }
    );
  }
  public onValChange(val: string) {
    this.eventForm.get('meeting').setValue('');
    this.errorMsg = '';
    this.meetingType = val;
    this.eventForm.get('meetingType').setValue(this.meetingType);
  }

  showActivityChange() {
    this.showActivity = !this.showActivity;
  }
  showStakeholderChange() {
    this.showStakeHolder = !this.showStakeHolder;
  }
  showSelectStakeholderChange() {
    this.showSelectStakeHolder = !this.showSelectStakeHolder;
  }
  showSelectCrewChange() {
    this.showSelectCrew = !this.showSelectCrew;
  }

  resetEventForm() {
    this.eventForm.reset();
    this.eventForm.setValue({
      meetingType: 'online',
      meeting: null,
      scheduleStart: moment(
        moment().add(0, 'd').format('YYYY-MM-DD') +
          ' 09:00 AM',
        'YYYY-MM-DD hh:mm A'
      ).toISOString(),
      scheduleEnd: moment(
        moment().add(0, 'd').format('YYYY-MM-DD') +
          ' 09:30 AM',
        'YYYY-MM-DD hh:mm A'
      ).toISOString(),
      description: null,
      eventTitle: this.eventTitle
    });
  }

  onNoClick(): void {
    this.dialogRef.close({ isCancel: true, isAdded: false });
  }
  stopPropagation(event) {
    event.stopPropagation();
  }
  storeStakeHolder() {
    const payload = this.stakeholderForm.value;
    payload.actionId = this.data.data.action.id;
    payload.isCustom = this.data.data.action.isCustom;
    this.http
      .post(`${environment.baseurl}/actionstakeholder/add-sel-activity`, payload)
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
      moment(this.date).format('YYYY-MM-DD') + ' ' + time, 'YYYY-MM-DD hh:mm A'
    ).toISOString();
    this.eventForm.get('scheduleStart').setValue(startTime);
  }
  getEndTime(time) {
    this.meetingEnd = time;
    const endTime = moment(
      moment(this.date).format('YYYY-MM-DD') + ' ' + time, 'YYYY-MM-DD hh:mm A'
    ).toISOString();
    this.eventForm.get('scheduleEnd').setValue(endTime);
  }
  storeEvent() {
    const payload = this.eventForm.value;
    let SprintCrew = null;
    let StakeHolder = null;
    StakeHolder = this.activityStakeHolder.map((o) => o.id);
    SprintCrew = this.activityCrew.map((o) => o.id);
    const finalPayload = {
      actionType: this.actionType,
      actionId: 1,
      date: this.date,
      timeFrom: payload.scheduleStart,
      timeTo: payload.scheduleEnd,
      isCustom: false,
      isOnline: payload.meetingType === 'online' ? true : false,
      address: payload.meeting,
      link: payload.meeting,
      description: payload.description,
      eventTitle:payload.eventTitle,
      stakeHolder: StakeHolder,
      supportCrew: SprintCrew,
    };
    console.log(finalPayload);
    // const finalPayload = {
    //   actionType: this.selectedActivity.code,
    //   // actionId: this.data.data.action.id,
    //   // isCustom: this.data.data.action.isCustom,
    //   date: this.date.toISOString(),
    //   timeFrom: payload.scheduleStart,
    //   timeTo: payload.scheduleEnd,
    //   isOnline: payload.meetingType === 'online' ? true : false,
    //   address: payload.meeting === null ? '--' : payload.meeting,
    //   link: payload.meeting === null ? '--' : payload.meeting,
    //   description: payload.description,
    //   stakeHolder: StakeHolder,
    //   supportCrew: SprintCrew,
    // };
    // this.dialogRef.close({ isCancel: false, isAdded: true });
     this.http
       .post(`${environment.baseurl}/actionactivity/add-activity-review`, finalPayload)
       .subscribe(
         (res: any) => {
           this.dialogRef.close({ isCancel: false, isAdded: true });
         },
         (err) => console.log(err)
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

  addToCrewStakeholder() {
    this.activityCrew = this.sprintCrew.filter((o) => {
      return this.selectedCrew.has(o.id);
    });
    this.activityStakeHolder = this.stakeholder.filter((o) => {
      return this.selectedStakeHolder.has(o.id);
    });
    this.showSelectStakeHolder = false;
    this.showSelectCrew = false;
  }
  changeDate(event) {
    this.selectedDate = moment(event.date).toISOString();
    this.date = this.selectedDate;
  }

  onkeyenter(event){
    if(this.meetingType=='online'){
      console.log("aaaaaaaaa")
      const substring = "https://";
      const sub ="http://"
      let a= event.target.value.includes(substring);
      let b = event.target.value.includes(sub)
      if(a == false && b == false){
        this.errorMsg = 'Please include https:// or http:// in your link';
      }
      else if((a == true && b== false) ||(a == false && b== true)){
        this.errorMsg = '';
      }
      else{
        this.errorMsg = '';
      }
    }else{
      this.errorMsg = '';
    }
  }
}
