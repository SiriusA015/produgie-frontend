import { SelectCrewDialogComponent } from './../select-crew-dialog/select-crew-dialog.component';
import { SelectActivityDialogComponent } from './../select-activity-dialog/select-activity-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CustomValidators } from 'ngx-custom-validators';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import * as _ from 'lodash';
import { AddStakeholderDialogComponent } from '../add-stakeholder-dialog/add-stakeholder-dialog.component';
import { SelectStakeholderDialogComponent } from '../select-stakeholder-dialog/select-stakeholder-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounce } from 'lodash';
const baseUrl = environment.baseurl;
interface Week {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
})
export class AddEventDialogComponent implements OnInit {

  loadCounter = 0;
  meetingType = 'online';
  selectedActivity = { code: 'SA', title: 'Select Activity' };
  activities: any[] = [
    {
      code: 'ACS',
      title: 'Align & Communicate Action With Stakeholder',
      checked: false,
    },
    { code: 'ESC', title: 'Engage With Sprint Crew Member(s)', checked: false },
    { code: 'SDL', title: 'Self Directed Learning', checked: false },
    { code: 'FSL', title: 'Formal/ Structured Learning', checked: false },
    { code: 'OTH', title: 'Other', checked: false },
  ];
  stakeholder = [];
  selectedDate;
  sprintCrew = [];
  selectedStakeHolder: Set<number> = new Set([]);
  selectedCrew: Set<number> = new Set([]);
  activityStakeHolder = [];
  StakeHolder = [];
  activityCrew = [];
  datePickerConfig = {};
  todayDate: Date = new Date();
  currentDate: Date = new Date();
  @ViewChild('mySelect1') mySelect1: any;
  @ViewChild('mySelect') mySelect: any;
  model = {
    from: '',
    to: '',
    link: '',
    address: '',
    description: '',
    eventTitle:''
  };
  stakeholderForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, CustomValidators.email]),
  });


  assessmentId: any;
  date = moment(
    moment().add(this.data.data.day, 'd').format('YYYY-MM-DD') + ' 00:00 AM',
    'YYYY-MM-DD hh:mm A'
  );
  minDate;
  // for modals from below
  showSelectStakeHolder = false;
  showSelectCrew = false;
  showActivity = false;
  showStakeHolder = false;
  stakeHolders: any;
  currentTimeDate:any;
  SprintCrew = [];
  timeslots: Week[] = [];
  timezone: Week[] = [
    { value: 'AM', viewValue: 'AM' },
    { value: 'PM', viewValue: 'PM' },
  ]

  eventDate: any;
  mstart = '09:00';
  mend = '10:00';
  startMeridian = 'AM';
  endMeridian = 'AM';
  meetingTimeStart: any;
  meetingTimeEnd: any;
  meetingStart: any;
  meetingEnd: any;
  onlineDiv: boolean = true;
  oflineDiv: boolean = false;
  tabEvent='Online';
  stakeids = [];
  meetingDate: any;
  meetingfrom = 'AM';
  meetingTo = 'AM';
  from = '09:00';
  to = '10:00';
  meetingTimeFrom: string;
  meetingTimeTo: string;
  crewids = [];
  editSelectedData: any;
  lastAddDateForEvent: any;
  isvalidTime: boolean = true;
  tabValue: boolean = true;
  isOnline: boolean;
  errormsg: boolean = false;
  isValidLink: boolean = true;
  validLink: boolean = true;
  errorMsg: string;
  currentTime: string;
  currentMeridian: string;
  newEventdate: string;
  newCurrentDate: string;
  currentDateTime: string;
  eventTitle: string;
  eventForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
  ) {
    this.spinner.hide();
  }

  ngOnInit(): void {
    this.spinner.hide();

  this.eventForm = new FormGroup({
    actionType: new FormControl(null, Validators.required),
    meetingType: new FormControl('online', Validators.required),
    meeting: new FormControl(null),
    address: new FormControl(null),
    scheduleStart: new FormControl(
      moment(
        moment().add(this.data.data.day, 'd').format('YYYY-MM-DD') +
        ' 09:00 AM',
        'YYYY-MM-DD hh:mm A'
      ).toISOString(),
      Validators.required
    ),
    scheduleEnd: new FormControl(
      moment(
        moment().add(this.data.data.day, 'd').format('YYYY-MM-DD') +
        ' 10:00 AM',
        'YYYY-MM-DD hh:mm A'
      ).toISOString(),
      Validators.required
    ),
    description: new FormControl(null),
    eventTitle: new FormControl(this.eventTitle),
  });
    if (this.data.isEdit == true) {
      this.isOnline = this.data.data.event.details.isOnline
      if (this.isOnline == false) {
        this.onlineDiv = false;
        this.oflineDiv = true;
      }
      else {
        this.onlineDiv = true;
        this.oflineDiv = false;
      }
    }
    for (let i = 1; i <= 12; i++) {
      this.timeslots.push({ value: ("0" + i).slice(-2) + ':00', viewValue: ("0" + i).slice(-2) + ':00' })
      this.timeslots.push({ value: ("0" + i).slice(-2) + ':30', viewValue: ("0" + i).slice(-2) + ':30' })
    }

    this.datePickerConfig = {
      openOnFocus: false,
      weekDayFormat: 'dd',
      min: moment(moment(moment().add(1, 'd')).format('DD-MM-YYYY'), 'YYYY-MM-DD hh:mm A'),
    };
    if (this.data.isEdit) {
      const eventData = this.data.data;
      if (
        eventData.event.type.code !== 'WC' &&
        eventData.event.type.code !== 'FF'
      ) {
        this.selectActivity(
          this.activities[
          _.findIndex(
            this.activities,
            (o) => o.code === eventData.event.type.code
          )
          ]
        );
        this.editSelectedData = eventData.event.type.code;
        this.meetingType = eventData.event.details.isOnline
          ? 'online'
          : 'offline';
        this.meetingDate = eventData.event.details.meetingDate;
        this.from = moment(eventData.event.details.meetingTimeFrom).format('hh:mm'),
        this.to = moment(eventData.event.details.meetingTimeTo).format('hh:mm'),
        this.meetingfrom = moment(eventData.event.details.meetingTimeFrom).format('A'),
        this.meetingTo = moment(eventData.event.details.meetingTimeTo).format('A'),
        this.mstart = this.from;
        this.mend = this.to;
        this.startMeridian = this.meetingfrom;
        this.endMeridian = this.meetingTo;
        this.meetingTimeFrom = UtilsService.getDateTime(
          eventData.event.details.meetingDate,
          moment(eventData.event.details.meetingTimeFrom).format('hh:mm') + ' ' + moment(eventData.event.details.meetingTimeFrom).format('A')
        ).toISOString(),
          this.meetingTimeTo = UtilsService.getDateTime(
            eventData.event.details.meetingDate,
            moment(eventData.event.details.meetingTimeTo).format('hh:mm') + ' ' + moment(eventData.event.details.meetingTimeTo).format('A')
          ).toISOString(),
          this.meetingTimeStart = UtilsService.getDateTime(
            this.meetingDate,
            this.from + ' ' + this.meetingfrom
          ).toISOString();
        this.isvalidTime = moment(this.meetingTimeTo).isAfter(this.meetingTimeFrom)
        this.meetingTimeEnd = UtilsService.getDateTime(
          this.meetingDate,
          this.to + ' ' + this.meetingTo
        ).toISOString();
        this.isvalidTime = moment(this.meetingTimeTo).isAfter(this.meetingTimeFrom)
        this.eventForm.setValue({
          actionType: this.editSelectedData,
          meetingType: eventData.event.details.isOnline ? 'online' : 'offline',
          meeting: eventData.event.details.meetingUrl ? eventData.event.details.meetingUrl : "--",
          address: eventData.event.details.address ? eventData.event.details.address : "--",
          scheduleStart: moment(
            moment().add(eventData.day, 'd').format('YYYY-MM-DD') +
            ' ' +
            moment(eventData.event.details.meetingTimeFrom).format('hh:mm A')
          ).toISOString(),
          scheduleEnd: moment(
            moment().add(eventData.day, 'd').format('YYYY-MM-DD') +
            ' ' +
            moment(eventData.event.details.meetingTimeTo).format('hh:mm A')
          ).toISOString(),
          description: eventData.event.details.description
            ? eventData.event.details.description
            : null,
          eventTitle: eventData.event.details.eventTitle
            ? eventData.event.details.eventTitle
            : null,

        });
        this.getCrewStakeholder();
      } else {
        this.eventForm.get('meetingType').clearValidators();
        this.eventForm.get('meeting').clearValidators();
      }
      this.newEventdate = moment(this.meetingDate).format('MM/DD/YYYY');
      this.newCurrentDate = moment(this.currentDate).format('MM/DD/YYYY');
      if (this.newEventdate == this.newCurrentDate) {
        this.currentDate.toLocaleTimeString();
        this.currentTime = moment(this.currentDate).format('hh:mm');
        this.currentMeridian = moment(this.currentDate).format('A');
      }
      this.meetingStart = moment(
        eventData.event.details.meetingTimeFrom
      ).format('hh:mm A');
      this.meetingEnd = moment(eventData.event.details.meetingTimeTo).format(
        'hh:mm A'
      );


    }

    this.getStakeHolder();
    this.getSprintCrew();
    this.getUserSprint();

    this.currentDateTime =  moment.utc( new Date()).toISOString(); 
    this.currentDate.toLocaleTimeString();
    this.currentTime = moment(this.currentDate).format('hh:mm');
    this.currentMeridian = moment(this.currentDate).format('A');
  }

  getSprintCrew() {
    this.http.get(`${baseUrl}/sprintcrew/get-sel`).subscribe(
      (res: any) => {
        this.sprintCrew = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCrewStakeholder() {
    this.http
      .get(
        `${environment.baseurl}/actionactivity/crew-stakeholder/` +
        this.data.data.event.details.id
      )
      .subscribe(
        (res: any) => {
          res.data.stakeHolder.map((o) => {
            this.selectedStakeHolder.add(o.id);
            this.activityStakeHolder.push(o);
            let array = [];
            res.data.stakeHolder.forEach(element => {
              array.push(element.id)
              this.stakeids = array;
            });
          });
          res.data.supportCrew.map((o) => {
            this.selectedCrew.add(o.id);
            this.activityCrew.push(o);
            let crewArray = [];
            res.data.supportCrew.forEach(element => {
              crewArray.push(element.id)
              this.crewids = crewArray;
            });
          });
        },
        (err) => console.log(err)
      );
  }
  public onValChange(val: string) {
    this.meetingType = val;
    this.eventForm.get('meetingType').setValue(this.meetingType);
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
  getOptions(event) {
    this.selectActivity(event.value);

  }
  showStakeholderChange() {
    // this.showStakeHolder = !this.showStakeHolder;
    const dialogRef = this.dialog.open(AddStakeholderDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      // height: '30vh',
      // panelClass: 'custom-menu-container-bottom',
      data: { action: this.data.data.action },
      // position: { left: '0', bottom: '0' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && !result.isCancel) {
        this.stakeholder = result.added;
        this.addToSelectedStakeHolder(result.added[0]);
        this.addToActivityStakeholder();
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
  getstakeId(event) {
     this.StakeHolder = event.value;
    }
  showSelectCrewChange() {
    const dialogRef = this.dialog.open(SelectCrewDialogComponent, {
      width: '100%',
      maxWidth: '100%',
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
  getCrewId(event) {
    this.SprintCrew = event.value;
  }
  selectActivity(activity) {
    this.showActivity = false;
    this.selectedActivity = activity;
    if (activity.code == 'ESC') {
      this.eventTitle = "Engage With Sprint Crew Member(s)";
      
    }
    if (activity.code == 'ACS') {
      this.eventTitle = "Align & Communicate Action With Stakeholder";
       }
    if (activity.code == 'SDL') {
      this.eventTitle ="Self Directed Learning";
      
    }
    if (activity.code == 'FSL') {
      this.eventTitle = "Formal/ Structured Learning";
      
    }
    if (activity.code == 'OTH') {
      this.eventTitle = "Other";
      
    }
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
  getEditOptions(event) {
     if (event.value == 'ESC') {
      event.value = { code: "ESC", title: "Engage With Sprint Crew Member(s)", checked: false }
      this.eventTitle = "Engage With Sprint Crew Member(s)";
      this.selectActivity(event.value);
    }
    if (event.value == 'ACS') {
      event.value = { code: "ACS", title: "Align & Communicate Action With Stakeholder", checked: false }
      this.eventTitle = "Align & Communicate Action With Stakeholder";
      this.selectActivity(event.value);
    }
    if (event.value == 'SDL') {
      event.value = { code: "SDL", title: "Self Directed Learning", checked: false };
      this.eventTitle ="Self Directed Learning";
      this.selectActivity(event.value);
    }
    if (event.value == 'FSL') {
      event.value = { code: 'FSL', title: 'Formal/ Structured Learning', checked: false }
      this.eventTitle = "Formal/ Structured Learning";
      this.selectActivity(event.value);
    }
    if (event.value == 'OTH') {
      event.value = { code: 'OTH', title: 'Other', checked: false };
      this.eventTitle = "Other";
      this.selectActivity(event.value);
    }
  }

  resetEventForm() {
    this.eventForm.reset();
    this.eventForm.setValue({
      actionType: this.selectedActivity.code,
      meetingType: 'online',
      meeting: null,
      address: null,
      scheduleStart: moment(
        moment().add(this.data.data.day, 'd').format('YYYY-MM-DD') +
        ' 09:00 AM',
        'YYYY-MM-DD hh:mm A'
      ).toISOString(),
      scheduleEnd: moment(
        moment().add(this.data.data.day, 'd').format('YYYY-MM-DD') +
        ' 10:00 AM',
        'YYYY-MM-DD hh:mm A'
      ).toISOString(),
      description: null,
      eventTitle:this.eventTitle
    });
  }

  onNoClick(): void {
    this.dialogRef.close({ isCancel: true, data: null });
  }
  stopPropagation(event) {
    event.stopPropagation();
  }
  getStakeHolder() {
    if (this.data.data.action.isCustom) {
      this.http
        .get(
          `${baseUrl}/actionstakeholder/get-custom/${this.data.data.action.id}`
        )
        .subscribe(
          (res: any) => {
            this.stakeholder = res.data.reverse();
          },
          (err) => console.log(err)
        );
    } else {
      this.http
        .get(`${baseUrl}/actionstakeholder/get/${this.data.data.action.id}`)
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
    payload.actionId = this.data.data.action.id;
    payload.isCustom = this.data.data.action.isCustom;
    this.http
      .post(`${baseUrl}/actionstakeholder/add-sel-activity`, payload)
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
  
  handleDateChange(event) {
    this.eventDate = event.value._d;
    this.newEventdate = moment(this.eventDate).format('MM/DD/YYYY');
    this.newCurrentDate = moment(this.currentDate).format('MM/DD/YYYY');
    if (this.newEventdate == this.newCurrentDate) {
      this.currentDate.toLocaleTimeString();
      this.currentTime = moment(this.currentDate).format('hh:mm');
      this.currentMeridian = moment(this.currentDate).format('A');
      if(this.currentMeridian == 'PM') {
        this.startMeridian = 'PM';
        this.endMeridian = 'PM';
        this.meetingfrom = 'PM';
        this.meetingTo = 'PM';
      } else {
       this.startMeridian = 'AM';
       this.endMeridian = 'AM';
       this.meetingfrom = 'AM';
       this.meetingTo = 'AM';
      }      
    }
    this.meetingTimeStart = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.meetingDate,
      this.mstart + ' ' + this.startMeridian
    ).toISOString();
    this.meetingTimeEnd = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.meetingDate,
      this.mend + ' ' + this.endMeridian
    ).toISOString();
    // this.isvalidTime = moment(this.meetingTimeEnd).isAfter(this.meetingTimeStart);

  }
  getStartTime(time) {
    this.mstart = time;
   this.meetingTimeStart = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.meetingDate,
      this.mstart + ' ' + this.startMeridian
    ).toISOString();

    this.isvalidTime = moment(this.meetingTimeEnd).isAfter(this.meetingTimeStart);
  }

  getEndTime(time) {
    this.mend = time;
    this.meetingTimeEnd = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.meetingDate,
      this.mend + ' ' + this.endMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingTimeEnd).isAfter(this.meetingTimeStart);
   }

  getStartMeridian(meridian) {
    this.startMeridian = meridian
    this.meetingTimeStart = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.meetingDate,
      this.mstart + ' ' + this.startMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingTimeEnd).isAfter(this.meetingTimeStart);
   }

  getendMeridian(meridian) {
    this.endMeridian = meridian
    this.meetingTimeEnd = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.meetingDate,
      this.mend + ' ' + this.endMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingTimeEnd).isAfter(this.meetingTimeStart);
  }
  onkeyenter(event) {
    const substring = "https://";
    const sub = "http://"
     let a = event.target.value.includes(substring);
    let b = event.target.value.includes(sub)
    if (a == false && b == false) {
      this.errorMsg = 'Please include https:// or http:// in your link';
    }
    else if ((a == true && b == false) || (a == false && b == true)) {
      this.errorMsg = '';
    }
    else {
      this.errorMsg = '';
    }
  }
  storeEvent() {
    const substring = "https://";
    const sub = "http://"
    this.isValidLink = this.eventForm.value.meeting != null && this.eventForm.value.link!="--" ? this.eventForm.value.meeting.includes(substring) : true;
    this.validLink = this.eventForm.value.meeting != null && this.eventForm.value.link!="--"? this.eventForm.value.meeting.includes(sub) : true;
    if (this.isValidLink == false && this.validLink == false && this.tabEvent == 'Online') {
      this._snackBar.open('Please include https:// or http:// in your link', '', {
        duration: 3000,
      });
      return;
      
    }
    else if(this.tabEvent == 'Online' && this.eventForm.value.meeting == null) {
      this._snackBar.open('Link  is mandatory to fill', '', {
        duration: 3000,
      });
      return;
    }
    else if (this.eventForm.value.eventTitle == '') {
      this._snackBar.open('Title is mandatory to fill', '', {
        duration: 3000,
      });
      return;
    }

    
     else if (this.isvalidTime == false) {
      this._snackBar.open('Start time should be less than End Time', '', {
        duration: 3000,
      });
      return;
    }
    else if (this.selectedActivity.code == 'ACS' && (this.StakeHolder.length == 0 || this.StakeHolder === null)) {
      this._snackBar.open('Please add stakeholder to continue', '', {
        duration: 3000,
      });
      return;
    }

    else if(this.meetingDate == '' || this.meetingDate == null){
      this._snackBar.open('Please select date and time', '', {
        duration: 3000,
      });
      return;
    }
    else if (this.selectedActivity.code == 'ESC' && this.SprintCrew.length == 0 || this.SprintCrew === null) {
      this._snackBar.open('Please add crew to continue', '', {
        duration: 3000,
      });
      return;
    }
    else if (this.newEventdate == this.newCurrentDate) {
      this.currentTimeDate = moment.utc( new Date()).toISOString(); 
      this.currentDate.toLocaleTimeString();
      this.currentTime = moment(this.currentDate).format('hh:mm');
      this.currentMeridian = moment(this.currentDate).format('A');
      if(!(moment(this.meetingTimeStart).isAfter(this.currentTimeDate)))
      {
         this._snackBar.open('Past start time and end time are not allowed', '', {
           duration: 3000,
         });
         return;
     }
     
      else {
      
        this.loadCounter += 1;
        const payload = this.eventForm.value;
        const finalPayload = {
          actionType: this.selectedActivity.code,
          actionId: this.data.data.action.id,
          isCustom: this.data.data.action.isCustom,
          date: moment(this.eventDate),
          timeFrom: this.meetingTimeStart,
          timeTo: this.meetingTimeEnd,
          isOnline: this.tabValue,
          address: payload.address? payload.address:'--' ,
          link: payload.meeting ?payload.meeting: '--',
          description: payload.description,
          eventTitle: payload.eventTitle,
          stakeHolder: this.StakeHolder ? this.StakeHolder : null,
          supportCrew: this.SprintCrew ? this.SprintCrew : null,
        };
        this.spinner.show();
        this.http
          .post(`${baseUrl}/actionactivity/add-activity`, finalPayload)
          .subscribe(
            (res: any) => {
              this.spinner.hide();
              payload.actionId = this.data.data.action.selectedActionId;
              const dataOut = {};
              dataOut[this.data.data.day] = payload;
              this.dialogRef.close({ isCancel: false, data: dataOut });
              this.loadCounter -= 1;
            },
            (err) => console.log(err)
          );
      }
    }
    else {

      this.loadCounter += 1;
      const payload = this.eventForm.value;
      const finalPayload = {
        actionType: this.selectedActivity.code,
        actionId: this.data.data.action.id,
        isCustom: this.data.data.action.isCustom,
        date: moment(this.eventDate),
        timeFrom: this.meetingTimeStart,
        timeTo: this.meetingTimeEnd,
        isOnline: this.tabValue,
        address: payload.address === null ? '--' : payload.address,
        link: payload.meeting === null ? '--' : payload.meeting,
        description: payload.description,
        eventTitle: payload.eventTitle,
        stakeHolder: this.StakeHolder ? this.StakeHolder : null,
        supportCrew: this.SprintCrew ? this.SprintCrew : null,
      };
      this.spinner.show();
      this.http
        .post(`${baseUrl}/actionactivity/add-activity`, finalPayload)
        .subscribe(
          (res: any) => {
            this.spinner.hide();
            payload.actionId = this.data.data.action.selectedActionId;
            const dataOut = {};
            dataOut[this.data.data.day] = payload;
            this.dialogRef.close({ isCancel: false, data: dataOut });
            this.loadCounter -= 1;
          },
          (err) => console.log(err)
        );
    }
  }
  updateEvent() {
    this.currentDateTime = moment.utc(new Date()).toISOString();
     const substring = "https://";
    const sub = "http://"
    this.isValidLink = this.eventForm.value.meeting != null && this.eventForm.value.meeting != "--" ? this.eventForm.value.meeting.includes(substring) : true;
    this.validLink = this.eventForm.value.meeting != null && this.eventForm.value.meeting != "--" ? this.eventForm.value.meeting.includes(sub) : true;
    if (this.isValidLink == false && this.validLink == false  && this.tabEvent == 'Online') {
      this._snackBar.open('Please include https:// or http:// in your link', '', {
        duration: 3000,
      });
      return;
    }
   else if(this.eventForm.value.meeting == "--" && this.onlineDiv == true){
      this._snackBar.open('Please include https:// or http:// in your link', '', {
        duration: 3000,
      });
      return;
    }
    else if (!(moment(this.meetingTimeStart).isAfter(this.currentDateTime))) {
      this._snackBar.open('You cannot select past date and past time', '', {
        duration: 3000,
      });
      return;
    }
    else if (this.isvalidTime == false) {
      this._snackBar.open('Start time should be less than End Time', '', {
        duration: 3000,
      });
      return;
    }
    else if (this.selectedActivity.code == 'ACS' && (this.stakeids.length == 0 || this.StakeHolder === null)) {
      this._snackBar.open('Please add stakeholder to continue', '', {
        duration: 3000,
      });
      return;
    }
    else if (this.selectedActivity.code == 'ESC' && (this.crewids.length == 0 || this.SprintCrew === null)) {
      this._snackBar.open('Please add crew to continue', '', {
        duration: 3000,
      });
      return;
    }
    else {
      this.loadCounter += 1;
      const wcevent = this.data.data.event;
      let date = moment(wcevent.details.meetingDate).toISOString();
      // tslint:disable-next-line:max-line-length
      let timeFrom = moment(
        moment(wcevent.details.meetingDate).format('YYYY-MM-DD') +
        ' ' +
        this.meetingStart,
        'YYYY-MM-DD hh:mm A'
      ).toISOString();
      // tslint:disable-next-line:max-line-length
      let timeTo = moment(
        moment(wcevent.details.meetingDate).format('YYYY-MM-DD') +
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
        actionId: this.data.data.action.id,
        isCustom: this.data.data.action.isCustom,
        date: this.eventDate ? this.eventDate : this.meetingDate,
        timeFrom: this.meetingTimeStart ? this.meetingTimeStart : this.meetingTimeFrom,
        timeTo: this.meetingTimeEnd ? this.meetingTimeEnd : this.meetingTimeTo,
        isOnline: this.tabValue,
        address: this.eventForm.value.address === null ? '--' : this.eventForm.value.address,
        link: this.eventForm.value.meeting === null ? '--' : this.eventForm.value.meeting,
        description: payload.description,
        eventTitle:payload.eventTitle,
        stakeHolder: this.StakeHolder && this.StakeHolder.length != 0 ? this.StakeHolder : this.stakeids,
        supportCrew: this.SprintCrew && this.SprintCrew.length != 0 ? this.SprintCrew : this.crewids,
      };
      this.spinner.show();
      this.http
        .post(
          `${baseUrl}/actionactivity/update/` + this.data.data.event.details.id,
          finalPayload
        )
        .subscribe(
          (res: any) => {
            this.spinner.hide();
            payload.actionId = this.data.data.action.selectedActionId;
            const dataOut = {};
            dataOut[this.data.data.day] = payload;
            this.dialogRef.close({ isCancel: false, data: dataOut });
            this.loadCounter -= 1;
          },
          (err) => console.log(err)
        );
    }
  }
  updateWC() {
    this.loadCounter += 1;
    const wcevent = this.data.data.event;
    let date = moment(wcevent.details.meetingDate).toISOString();
    let timeFrom = moment(
      moment(wcevent.details.meetingDate).format('YYYY-MM-DD') +
      ' ' +
      this.meetingStart,
      'YYYY-MM-DD hh:mm A'
    ).toISOString();
    let timeTo = moment(
      moment(wcevent.details.meetingDate).format('YYYY-MM-DD') +
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
      actionType: wcevent.type.code,
      date,
      timeFrom,
      timeTo,
    };
    this.http
      .post(
        `${environment.baseurl}/actionactivity/update-wc/${wcevent.id}`,
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
  }

  close() {
    this.mySelect.close();
  }
  matClose() {
    this.mySelect1.close();
  }
  stakeholderLength() {
    if (this.stakeHolders?.length == 0) {
      this._snackBar.open('Please add stakeholder to continue', '', {
        duration: 2000,
      });
    }
  }
  getOnlineEvent(type) {
    this.tabEvent = type;
    if (this.tabEvent == 'Online') {
      this.tabValue = true;
      this.eventForm.value.address = "--";

    }
    this.onlineDiv = true;
    this.oflineDiv = false;
  }
  getOfflineEvent(type) {
    this.tabEvent = type;
    if (this.tabEvent == 'Offline') {
      this.tabValue = false;
      this.eventForm.value.meeting = "--";

    }
    this.oflineDiv = true;
    this.onlineDiv = false;
  }
  getUserSprint() {
    this.http.get(environment.baseurl + `/usersprint/get-usersprint`).subscribe((result: any) => {
      this.lastAddDateForEvent = result.data[0].datetimeTo;
      const day: any = moment(this.lastAddDateForEvent).format('DD');
      const month: any = moment(this.lastAddDateForEvent).format('MM');
      const year: any = moment(this.lastAddDateForEvent).format('YYYY');
      this.lastAddDateForEvent = new Date(year, month - 1, day);


    }, errors => {
      console.log(errors);
    });
  }
}
