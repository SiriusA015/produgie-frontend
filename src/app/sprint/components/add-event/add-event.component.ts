import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddStakeholderComponent } from '../add-stakeholder/add-stakeholder.component';
import { ConfigService } from '../../../shared/service/config.service';
import { UtilsService } from '../../../shared/utils/utils.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
interface Week {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})

export class AddEventComponent implements OnInit {
  activity: any;
  activityData: any;
  crewMember: any;
  stakeHolders: any;
  activityDiv: boolean = false;
  showCrewDiv: boolean = false;
  showStakeDiv: boolean = false;
  meetingDiv: boolean = false;
  showDateDiv: boolean = false;
  test = [new Date(), new Date()];
  @ViewChild('f') form: any;
  @ViewChild('mySelect') mySelect: any;
  @ViewChild('mySelect1') mySelect1: any;
  model = {
    from: '',
    to: '',
    link: '',
    address: '',
    description: '',
    eventTitle:''
  };
  todayDate: Date = new Date();
  stakeHolder: any[];
  supportCrew: any[];
  tabEvent: any;
  eventDate: any;
  actionType: string;
  onlineDiv: boolean = true;
  oflineDiv: boolean = false;
  meetingStart: any;
  meetingEnd: any;
  mstart = '09:00';
  mend = '10:00';
  startMeridian = 'AM';
  endMeridian = 'AM';
  timeslots: Week[] = [];
  dataFromRoadMap: any;
  id: any;
  stakeHolderData: any;
  minCurrentDate: any;
  lastAddDateForEvent: any;
  isvalidTime: boolean = true;
  tabValue: boolean = true;
  isValidLink: boolean = true ;
  validLink: boolean = true;
  errorMsg: string;
  currentDate: Date = new Date();
  newEventdate: string;
  newCurrentDate: string;
  currentTime: string;
  currentMeridian: string;
  currentDateTime: string;
  constructor(public dialogRef: MatDialogRef<AddEventComponent>, private spinner: NgxSpinnerService, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, public configService: ConfigService, private _bottomSheet: MatBottomSheet, public router: Router, private http: HttpClient,) {
    if (data) {
      this.dataFromRoadMap = data;

      if (this.dataFromRoadMap) {
        this.activityDiv = true;
      }
    }
  }

  // Froms: Week[] = [
  //   { value: '01:00', viewValue: '01:00' },
  //   { value: '02:00 ', viewValue: '02:00' },
  //   { value: '03:00 ', viewValue: '03:00' },
  //   { value: '04:00 ', viewValue: '04:00' },
  //   { value: '05:00 ', viewValue: '05:00' },
  //   { value: '06:00 ', viewValue: '06:00' },
  //   { value: '07:00 ', viewValue: '07:00' },
  //   { value: '08:00', viewValue: '08:00' },
  //   { value: '09:00 ', viewValue: '09:00' },
  //   { value: '10:00 ', viewValue: '10:00' },
  //   { value: '11:00 ', viewValue: '11:00' },
  //   { value: '12:00 ', viewValue: '12:00' },
  // ];


  // tos: Week[] = [
  //   { value: '01:00', viewValue: '01:00' },
  //   { value: '02:00 ', viewValue: '02:00' },
  //   { value: '03:00 ', viewValue: '03:00' },
  //   { value: '04:00 ', viewValue: '04:00' },
  //   { value: '05:00 ', viewValue: '05:00' },
  //   { value: '06:00 ', viewValue: '06:00' },
  //   { value: '07:00 ', viewValue: '07:00' },
  //   { value: '08:00', viewValue: '08:00' },
  //   { value: '09:00 ', viewValue: '09:00' },
  //   { value: '10:00 ', viewValue: '10:00' },
  //   { value: '11:00 ', viewValue: '11:00' },
  //   { value: '12:00 ', viewValue: '12:00' },
  // ];



  timezone: Week[] = [
    { value: 'AM', viewValue: 'AM' },
    { value: 'PM', viewValue: 'PM' },
  ]
  ngOnInit(): void {
    this.getUserSprint();
    this.minCurrentDate = new Date();
    for (let i = 1; i <= 12; i++) {
      this.timeslots.push({ value: ("0" + i).slice(-2) + ':00', viewValue: ("0" + i).slice(-2) + ':00' })
      this.timeslots.push({ value: ("0" + i).slice(-2) + ':30', viewValue: ("0" + i).slice(-2) + ':30' })
    }

    this.getActivity();
    this.currentDateTime =  moment.utc( new Date()).toISOString(); 
        this.currentDate.toLocaleTimeString();
        this.currentTime = moment(this.currentDate).format('hh:mm');
        this.currentMeridian = moment(this.currentDate).format('A');
  }

  getUserSprint() {
    this.http.get(environment.baseurl + `/usersprint/get-usersprint`).subscribe((result: any) => {
      this.lastAddDateForEvent = result.data[0].datetimeTo;

      const day: any = moment(this.lastAddDateForEvent).format('DD');
      const month: any = moment(this.lastAddDateForEvent).format('MM');
      const year: any = moment(this.lastAddDateForEvent).format('YYYY');
      this.lastAddDateForEvent = new Date(year, month - 1, day);

    }, errors => {});
  }

  getActivity() {
    this.spinner.show();
    this.http
      .get(`${environment.baseurl}/actionroadmap/get-roadmap-activity`)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.activity = res.data;
          this.activity = this.activity.filter(data => data.roadmap && data.roadmap.isStarted == true && data.roadmap.isFinished == false);
        },
        (err) => {
          this.spinner.hide();
        })
  }

  onNoClick(): void {
    this.dialogRef.close('true');
  }
  onGetActivity(event) {
    this.activityData = event.value;
    this.activityDiv = true;

  }
  getOptions(event) {
    this.showDateDiv = true;
    if (event.value == 'option1') {
      this.getCrewData();
      this.showCrewDiv = true;
      this.showStakeDiv = false;
      this.meetingDiv = true;
      this.actionType = "ESC";
      this.model.eventTitle = "Engage With Sprint Crew Member";
    }
    if (event.value == 'option') {
      this.getStakeHoldersData();
      this.showStakeDiv = true;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "ACS";
      this.model.eventTitle = "Align & Communicate Action With Stakeholder";
    }
    if (event.value == 'option2') {
      this.showStakeDiv = false;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "SDL";
      this.model.eventTitle = "Self Directed Learning";
    }
    if (event.value == 'option3') {
      this.showStakeDiv = false;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "FSL";
      this.model.eventTitle = "Formal/Structured Learning";
    }
    if (event.value == 'option4') {
      this.showStakeDiv = false;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "OTH";
      this.model.eventTitle = "Other";
    }
  }
  openBottomSheet(): void {
    if (!this.dataFromRoadMap) {
      this.stakeHolderData = this.activityData;
    }
    else {
      this.stakeHolderData = this.dataFromRoadMap.data
    }
    const dialogRef = this.dialog.open(AddStakeholderComponent, {
      width: '100%',
      maxWidth: '100%',
      data: { data: this.stakeHolderData, type: 'add' }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getStakeHoldersData();
      // if (!result.isCancel) {
      //   this.getAllEvents();
      // }
    });
    // const dialogRef = this._bottomSheet.open(AddStakeholderComponent, {
    //   data: {item:this.activityData}
    // }); 
  }
  getCrewData() {
    this.spinner.show();
    this.http
      .get(`${environment.baseurl}/sprintcrew/get-sel`)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.crewMember = res.data;

        },
        (err) => {
          console.error(err);
          this.spinner.hide();
        })
  }
  getStakeHoldersData() {
    if (!this.dataFromRoadMap) {
      this.id = this.activityData.action.id;
    }
    else {
      this.id = this.dataFromRoadMap.data.action.id;
    }
    this.spinner.show();
    this.http
      .get(`${environment.baseurl}/actionstakeholder/get/${this.id}`)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.stakeHolders = res.data;
        },
        (err) => {
          this.spinner.hide();
        })
  }
  getOnlineEvent(type) {
    this.tabEvent = type;
    if (this.tabEvent == 'Online') {
      this.tabValue = true;
    }
    this.onlineDiv = true;
    this.oflineDiv = false;
  }
  getOfflineEvent(type) {
    this.tabEvent = type;
    if (this.tabEvent == 'Offline') {
      this.tabValue = false;
    }
    this.oflineDiv = true;
    this.onlineDiv = false;
  }
  handleDateChange(event) {
    this.eventDate = event.value._d;
    this.newEventdate=moment(this.eventDate).format('MM/DD/YYYY');
    this.newCurrentDate =moment(this.currentDate).format('MM/DD/YYYY');
     if(this.newEventdate == this.newCurrentDate){
       this.currentDate.toLocaleTimeString();
       this.currentTime = moment(this.currentDate).format('hh:mm');
       this.currentMeridian = moment(this.currentDate).format('A');
       if(this.currentMeridian === 'PM') {
         this.startMeridian = 'PM';
         this.endMeridian = 'PM';
       } else {
        this.startMeridian = 'AM';
        this.endMeridian = 'AM';
       }
     }
    this.meetingStart = UtilsService.getDateTime(
      this.eventDate,
      this.mstart + ' ' + this.startMeridian
    ).toISOString();
    this.meetingEnd = UtilsService.getDateTime(
      this.eventDate,
      this.mend + ' ' + this.endMeridian
    ).toISOString();
  }
  getstakeId(event) {
    let stakeId = [];
    let id = event.value;
    for (let data of id)
      stakeId.push(data.id);
    this.stakeHolder = stakeId;
  }
  getCrewId(event) {
    let crewId = [];
    let id = event.value;
    for (let data of id) {
      crewId.push(data.id);
      this.supportCrew = crewId;
    }
  }
  onkeyenter(event){
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
  }

  ceateEvent() {
    const substring = "https://";
    const sub ="http://"
    this.isValidLink =this.form.value.link!=null && this.form.value.link!="--"?this.form.value.link.includes(substring):true;
    this.validLink = this.form.value.link!=null && this.form.value.link!="--"?this.form.value.link.includes(sub):true;
    if ( this.isValidLink == false && this.validLink == false) {
      this._snackBar.open('Please include https:// or http:// in your link', '', {
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
    else if (this.form.value.eventTitle == '') {
      this._snackBar.open('Title is mandatory to fill', '', {
        duration: 3000,
      });
      return;
    }
    else if(this.actionType == 'ACS' && this.stakeHolder == null){
      this._snackBar.open('Please add stakeholder to continue', '', {
        duration: 3000,
      });
      return;
    }
    else if(this.actionType == 'ESC'&& this.supportCrew == null){
      this._snackBar.open('Please add crew to continue', '', {
        duration: 3000,
      });
      return;
    }
    else if(this.newEventdate === '' || this.newEventdate === undefined){
      this._snackBar.open('Please select date and time', '', {
        duration: 3000,
      });
      return;
    }
    else if(this.newEventdate == this.newCurrentDate)
     { 
        this.currentDateTime =  moment.utc( new Date()).toISOString(); 
        this.currentDate.toLocaleTimeString();
        this.currentTime = moment(this.currentDate).format('hh:mm');
        this.currentMeridian = moment(this.currentDate).format('A');
      if(!(moment(this.meetingStart).isAfter(this.currentDateTime)))
      {
         this._snackBar.open('Past start time and end time are not allowed', '', {
           duration: 3000,
         });
         return;
   }
      else {
        let data = {
          actionType: this.actionType,
          actionId: this.dataFromRoadMap ? this.dataFromRoadMap.data.action.id : this.activityData.action.id,
          isCustom: this.dataFromRoadMap ? false : this.activityData.isCustom,
          date: moment(this.eventDate),
          timeFrom: this.meetingStart,
          timeTo: this.meetingEnd,
          isOnline: this.tabValue,
          address: this.model.address ? this.model.address : "--",
          link: this.model.link ? this.model.link : "--",
          description: this.model.description ? this.model.description : null,
          eventTitle: this.model.eventTitle,
          stakeHolder: this.stakeHolder ? this.stakeHolder : null,
          supportCrew: this.supportCrew ? this.supportCrew : null
  
        }
  
        this.spinner.show();
        this.http.post(`${environment.baseurl}/actionactivity/add-activity`, data).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.onNoClick();
            window.location.reload();
          },
          (err) => {
            console.error(err);
            this.spinner.hide();  
          })  
      }
    }
    else {
      let data = {
        actionType: this.actionType,
        actionId: this.dataFromRoadMap ? this.dataFromRoadMap.data.action.id : this.activityData.action.id,
        isCustom: this.dataFromRoadMap ? false : this.activityData.isCustom,
        date: moment(this.eventDate),
        timeFrom: this.meetingStart,
        timeTo: this.meetingEnd,
        isOnline: this.tabValue,
        address: this.model.address ? this.model.address : "--",
        link: this.model.link ? this.model.link : "--",
        description: this.model.description ? this.model.description : null,
        eventTitle: this.model.eventTitle,
        stakeHolder: this.stakeHolder ? this.stakeHolder : null,
        supportCrew: this.supportCrew ? this.supportCrew : null

      }
      this.spinner.show();
      this.http.post(`${environment.baseurl}/actionactivity/add-activity`, data).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.onNoClick();
          window.location.reload();
        },
        (err) => {
          this.spinner.hide();
        })
    }
  }

  getStartTime(time) {
    this.mstart = time;
    this.meetingStart = UtilsService.getDateTime(
      this.eventDate,
      this.mstart + ' ' + this.startMeridian
    ).toISOString();

    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
  }

  getEndTime(time) {
    this.mend = time;
    this.meetingEnd = UtilsService.getDateTime(
      this.eventDate,
      this.mend + ' ' + this.endMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
  }

  getStartMeridian(meridian) {
    this.startMeridian = meridian
    this.meetingStart = UtilsService.getDateTime(
      this.eventDate,
      this.mstart + ' ' + this.startMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
  }

  getendMeridian(meridian) {
    this.endMeridian = meridian
    this.meetingEnd = UtilsService.getDateTime(
      this.eventDate,
      this.mend + ' ' + this.endMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
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
        duration: 3000,
      });
    }
  }
}
