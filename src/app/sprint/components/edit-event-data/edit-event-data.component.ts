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
import { FormControl } from '@angular/forms';
interface Week {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit-event-data',
  templateUrl: './edit-event-data.component.html',
  styleUrls: ['./edit-event-data.component.scss']
})
export class EditEventDataComponent implements OnInit {
  selectedOption: any;
  activityCrew: any;
  stakeholder: any;
  stakeName = [];
  crewName = [];
  desDiv: boolean;
  stakeValue: boolean = false;
  crewValue: boolean = false;
  stakeHolderName = [];
  isOnline: boolean;
  tabValue: boolean = true;
  isvalidTime: boolean = true;
  errorMsg: string;
  newEventdate: string;
  newCurrentDate: string;
  currentTime: string;
  currentMeridian: string;
  todayDate: any;
  currentDateTime: string;
  eventTitle: string;
  // toppingList: any;

  constructor(public dialogRef: MatDialogRef<EditEventDataComponent>, private spinner: NgxSpinnerService, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, public configService: ConfigService, private _bottomSheet: MatBottomSheet, public router: Router, private http: HttpClient) {
    console.log('edit data', data)
  }
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
  stakeHolder=[];
  supportCrew=[];
  tabEvent='Online';
  eventDate: any;
  actionType: string;
  onlineDiv: boolean = true;
  oflineDiv: boolean = false;
  meetingStart: any;
  meetingEnd: any;
  mstart : any;
  mend :any;
  startMeridian:any;
  endMeridian :any;
  timeslots: Week[] = [];
  dataFromRoadMap: any;
  id: any;
  stakeHolderData: any;
  timezone: Week[] = [
    { value: 'AM', viewValue: 'AM' },
    { value: 'PM', viewValue: 'PM' },
  ]
  model: any;
  isValidLink: boolean = true;
  validLink: boolean = true;
  currentDate: Date = new Date();
  // toppings = new FormControl();
  //  selected=[];

  ngOnInit(): void {
    // this.getActivity();

    if (this.data) {
      this.isOnline = this.data.description.activityDetails.isOnline
      console.log('hi', this.isOnline)
      if (this.isOnline == false) {
        this.onlineDiv = false;
        this.oflineDiv = true;
      }
      else {
        this.onlineDiv = true;
        this.oflineDiv = false;
      }
    }
    this.getCrewData();
    this.getStakeHoldersData();
    // this.getCrewStakeholder();
    for (let i = 1; i <= 12; i++) {
      this.timeslots.push({ value: ("0" + i).slice(-2) + ':00', viewValue: ("0" + i).slice(-2) + ':00' })
      this.timeslots.push({ value: ("0" + i).slice(-2) + ':30', viewValue: ("0" + i).slice(-2) + ':30' })
    }
    if (this.data.description.activityType.code == 'ESC') {
      this.showCrewDiv = true;
      this.showStakeDiv = false;
      this.meetingDiv = true;
      this.actionType = "ESC";
      this.eventTitle = "Engage With Sprint crew Member";
      this.desDiv = true;
      this.getCrewStakeholder();
    }
    if (this.data.description.activityType.code == 'ACS') {
      this.showStakeDiv = true;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "ACS";
      this.eventTitle = "Align & Communicate Action With Stakeholder";
      this.desDiv = true;
      this.getCrewStakeholder();
    }
    if (this.data.description.activityType.code == 'WC') {
      this.showCrewDiv = false;
      this.meetingDiv = false;
      this.desDiv = false;
      this.actionType = "WC"
    }
    if (this.data.description.activityType.code == 'SDL') {
      this.showCrewDiv = false;
      this.meetingDiv = false;
      this.desDiv = true;
      this.actionType = "SDL";
      this.eventTitle = "Self Directed Learning";
    }
    if (this.data.description.activityType.code == 'FSL') {
      this.meetingDiv = false;
      this.showStakeDiv = false;
      this.desDiv = true;
      this.actionType = "FSL";
      this.eventTitle = "Formal/Structured Learning";
    }
    if (this.data.description.activityType.code == 'OTH') {
      this.actionType = "OTH"
      this.desDiv = true;
      this.eventTitle = "Other";
    }
    
    this.model = {
      action: this.data.description.action.description,
      title: this.data.description.activityType.title,
      date: moment(this.data.description.activityDetails.meetingDate),
      from: moment(this.data.description.activityDetails.meetingTimeFrom).format('hh:mm'),
      to: moment(this.data.description.activityDetails.meetingTimeTo).format('hh:mm'),
      fromMeridian: moment(this.data.description.activityDetails.meetingTimeFrom).format('A'),
      toMeridian: moment(this.data.description.activityDetails.meetingTimeTo).format('A'),
      link: this.data.description.activityDetails.meetingUrl,
      eventTitle:this.data.description.activityDetails.eventTitle,
      address: this.data.description.activityDetails.address,
      description: this.data.description.activityDetails.description,
      meetingfrom: UtilsService.getDateTime(
        this.data.description.activityDetails.meetingDate,
        moment(this.data.description.activityDetails.meetingTimeFrom).format('hh:mm') + ' ' + moment(this.data.description.activityDetails.meetingTimeFrom).format('A')
      ).toISOString()
      ,
      meetingTo: UtilsService.getDateTime(
        this.data.description.activityDetails.meetingDate,
        moment(this.data.description.activityDetails.meetingTimeTo).format('hh:mm') + ' ' + moment(this.data.description.activityDetails.meetingTimeTo).format('A')
      ).toISOString(),

    };
    this.mstart =this.model.from;
    this.startMeridian = this.model.fromMeridian;
    this.mend =this.model.to;
    this.endMeridian =this.model.toMeridian;
    this.meetingStart = UtilsService.getDateTime(
    this.eventDate? this.eventDate:this.model.date,
      this.model.from + ' ' + this.model.fromMeridian
    ).toISOString();
    this.meetingEnd = UtilsService.getDateTime(
      this.eventDate? this.eventDate:this.model.date,
        this.model.to + ' ' + this.model.toMeridian
      ).toISOString();
    this.isvalidTime = moment(this.model.meetingTo).isAfter(this.model.meetingfrom);
    console.log('model', this.model , this.isvalidTime)
    this.selectedOption = this.model.action;
    this.newEventdate=moment(this.model.date).format('MM/DD/YYYY');
    this.newCurrentDate =moment(this.currentDate).format('MM/DD/YYYY');
     if(this.newEventdate == this.newCurrentDate){
       this.todayDate = this.currentDate;
       this.currentDate.toLocaleTimeString();
       console.log('dateeeeeeee', this.currentDate,)
       this.currentTime = moment(this.currentDate).format('hh:mm');
       console.log('a', this.currentTime)
       this.currentMeridian = moment(this.currentDate).format('A');
       console.log('b', this.currentMeridian)
     }
  }
  getActivity() {
    this.spinner.show();
    this.http
      .get(`${environment.baseurl}/actionroadmap/get-roadmap-activity`)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log('res', res);
          this.activity = res.data;
          this.activity = this.activity.filter(data => data.roadmap)
          console.log('activity', this.activity);
        },
        (err) => {
          console.error(err);
          this.spinner.hide();
        })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onGetActivity(event) {
    console.log('event', event)
    this.activityData = event.value;
    console.log('@@', this.activityData);
    this.activityDiv = true;

  }
  getOptions(event) {
    console.log('event@@@@@@@@@', event)
    this.showDateDiv = true;
    if (event.value == 'Engage With Sprint Crew Member(s)') {
      this.showCrewDiv = true;
      this.showStakeDiv = false;
      this.meetingDiv = true;
      this.actionType = "ESC";
    }
    if (event.value == 'Align & Communicate Action With Stakeholder') {
      this.showStakeDiv = true;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "ACS";
    }
    if (event.value == 'Self Directed Learning') {
      this.showStakeDiv = false;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "SDL"
    }
    if (event.value == 'Formal/ Structured Learning') {
      this.showStakeDiv = false;
      this.showCrewDiv = false;
      this.meetingDiv = false;
      this.actionType = "FSL"
    }
    if (event.value == 'Others') {
      this.showStakeDiv = false;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "OTH"
    }
  }
  openBottomSheet(): void {
    console.log('thisss', this.activityData)
    if (!this.dataFromRoadMap) {
      this.stakeHolderData = this.activityData;
    }
    else {
      this.stakeHolderData = this.dataFromRoadMap.data
    }
    const dialogRef = this.dialog.open(AddStakeholderComponent, {
      width: '100%',
      maxWidth: '100%',
      data: { data: this.data, type: 'edit' }
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
          console.log('res', res);
          this.spinner.hide();
          this.crewMember = res.data;

        },
        (err) => {
          console.error(err);
          this.spinner.hide();
        })
  }
  getStakeHoldersData() {
    this.id = this.data.description.action.id;
    this.spinner.show();
    this.http
      .get(`${environment.baseurl}/actionstakeholder/get/${this.id}`)
      .subscribe(
        (res: any) => {
          console.log('res', res);
          this.spinner.hide();
          this.stakeHolders = res.data;
          // this.toppingList= this.stakeHolders;
          // this.selected =this.stakeholder ;
          console.log('resssss', this.stakeHolders);
          // this.crewMember = res.data;

        },
        (err) => {
          console.error(err);
          this.spinner.hide();
        })
  }
  getOnlineEvent(type) {
    console.log('typr', type);
    this.tabEvent = type;
    if (this.tabEvent == 'Online') {
      this.tabValue = true;
      this.model.link = this.form.value.link;
      console.log('event', this.model.link);

    }
    this.onlineDiv = true;
    this.oflineDiv = false;
  }
  getOfflineEvent(type) {
    console.log('typee', type)
    this.tabEvent = type;
    if (this.tabEvent == 'Offline') {
      this.tabValue = false;
      this.model.address = this.form.value.address;
      console.log('event', this.model.link);

    }
    this.oflineDiv = true;
    this.onlineDiv = false;
  }
  handleDateChange(event) {
    console.log('event', event.value._d)
    this.eventDate = event.value._d;
    console.log('eventDate', this.eventDate);
    this.newEventdate=moment(this.eventDate).format('MM/DD/YYYY');
    this.newCurrentDate =moment(this.currentDate).format('MM/DD/YYYY');
     if(this.newEventdate == this.newCurrentDate){
       this.currentDate.toLocaleTimeString();
       console.log('dateeeeeeee', this.currentDate,)
       this.currentTime = moment(this.currentDate).format('hh:mm');
       console.log('a', this.currentTime)
       this.currentMeridian = moment(this.currentDate).format('A');
       console.log('b', this.currentMeridian)
     }
     this.meetingStart = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.model.date,
      this.mstart + ' ' + this.startMeridian
    ).toISOString();
    console.log('start' , this.meetingStart)
    this.meetingEnd = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.model.date,
      this.mend + ' ' + this.endMeridian
    ).toISOString();
    console.log('start' , this.meetingEnd)

  }
  getstakeId(event) {
    console.log('event', event)
    this.stakeValue = true;
    // let stakeId = [];
    // let id = event.value;
    // for (let data of id)
    //   stakeId.push(data.id);
    this.stakeHolder = event.value;
    console.log('stake', this.stakeHolder)

  }
  getCrewId(event) {
    this.crewValue = true;
    console.log('event', event);
    // let crewId = [];
    // let id = event.value;
    // for (let data of id) {
    //   crewId.push(data.id);
    this.supportCrew = event.value;
    console.log('this....', this.supportCrew)
    // }



  }
  onkeyenter(event) {
    const substring = "https://";
    const sub = "http://"
    console.log(event.target.value)
    let a = event.target.value.includes(substring);
    let b = event.target.value.includes(sub)
    if (a == false && b == false) {
      console.log('e', a, b)
      this.errorMsg = 'Please include https:// or http:// in your link';
      console.log('errorr', this.errorMsg)
    }
    else if ((a == true && b == false) || (a == false && b == true)) {
      this.errorMsg = '';
    }
    else {
      console.log('im here', a, b)
      this.errorMsg = '';
    }
  }
  ceateEvent() {
    this.currentDateTime =  moment.utc( new Date()).toISOString(); 
    const substring = "https://";
    const sub = "http://"
    this.isValidLink =this.form.value.link!=null && this.form.value.link!="--"?this.form.value.link.includes(substring):true;
    this.validLink = this.form.value.link!=null && this.form.value.link!="--"?this.form.value.link.includes(sub):true;
    if (this.isValidLink == false && this.validLink == false && this.tabEvent == 'Online') {
      this._snackBar.open('Please include https:// or http:// in your link', '', {
        duration: 3000,
      });
      return;
    }
    else if((this.form.value.link == "--" || this.form.value.link == null) && this.isOnline == true && this.tabEvent == 'Online'){
      this._snackBar.open('Please include https:// or http:// in your link', '', {
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
    else if(this.isvalidTime == false) {
      this._snackBar.open('Start time should be less than End Time', '', {
        duration: 3000,
      });
      return;
    }
    
    else if(!(moment(this.meetingStart).isAfter(this.currentDateTime))) {
      this._snackBar.open('You cannot select past date and past time', '', {
        duration: 3000,
      });
      return;
    }
    else if(this.actionType == 'ACS' && (this.stakeHolder.length == 0 && this.stakeName.length ==0)){
      this._snackBar.open('Please add stakeholder to continue', '', {
        duration: 3000,
      });
      return;
    }
    else if(this.actionType == 'ESC'&& (this.supportCrew.length == 0 && this.crewName.length == 0)){
      this._snackBar.open('Please add crew to continue', '', {
        duration: 3000,
      });
      return;
    }
    else {
      let data = {
        actionType: this.actionType,
        actionId: this.data.description.action.id,
        isCustom: this.data.description.isCustom,
        date: this.eventDate ? this.eventDate : this.model.date,
        timeFrom: this.meetingStart ? this.meetingStart : this.model.meetingfrom,
        timeTo: this.meetingEnd ? this.meetingEnd : this.model.meetingTo,
        isOnline: this.tabValue,
        address: this.model.address ? this.model.address : "--",
        link: this.model.link ? this.model.link : "--",
        eventTitle:this.model.eventTitle,
        description: this.model.description ? this.model.description : null,
        stakeHolder: this.stakeHolder && this.stakeHolder.length != 0 ? this.stakeHolder : this.stakeName,
        supportCrew: this.supportCrew && this.supportCrew.length != 0 ? this.supportCrew : this.crewName
      }
      console.log('this.crew' , this.crewName,this.supportCrew)
      // if(this.stakeHolder){
      //   data['supportCrew'] = null;
      // }
      // if(!this.stakeholder){
      //   data['supportCrew'] = null;
      // }
      // if(this.supportCrew){
      //   data['stakeHolder'] = null;
      // }
      // if(!this.supportCrew){
      //  data['stakeHolder'] = null;
      // }
      // if(this.crewValue == true){

      //   data.supportCrew = this.supportCrew
      // }
      // else if(this.crewValue == false){

      //   data.supportCrew = this.crewName
      // }
      // else{
      //   data['supportCrew'] = null;
      // }

      console.log('data', data)

      this.spinner.show();
      this.http.post(`${environment.baseurl}/actionactivity/update/${this.data.description.activityDetails.id}`, data).subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log('res', res)
          if (res.status == 200) {
            this.onNoClick();
            window.location.reload();
          }

        },
        (err) => {
          console.error(err);
          this.spinner.hide();

        })
    }
  }



  getStartTime(time) {
    this.mstart = time;
    console.log(this.mstart);
    this.meetingStart = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.model.date,
      this.mstart + ' ' + this.startMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
    console.log('thus meetingStart', this.meetingStart,this.mstart,this.startMeridian);
    console.log('meeting end',this.meetingEnd,)
    console.log('valid time start tim',this.isvalidTime);
  }

  getEndTime(time) {
    this.mend = time;
    console.log(this.mend);
    this.meetingEnd = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.model.date,
      this.mend + ' ' + this.endMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
    console.log('meeting end',this.meetingEnd,this.mend,this.endMeridian)
    console.log('valid time end time',this.isvalidTime);;
  }

  getStartMeridian(meridian) {
    this.startMeridian = meridian
    this.meetingStart = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.model.date,
      this.mstart + ' ' + this.startMeridian
    ).toISOString();
    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
    console.log(this.startMeridian);
    console.log('thus meetingStart', this.meetingStart,this.mstart,this.startMeridian);

    console.log('valid time start meridian',this.isvalidTime);
  }

  getendMeridian(meridian) {
    this.endMeridian = meridian
    this.meetingEnd = UtilsService.getDateTime(
      this.eventDate ? this.eventDate : this.model.date,
      this.mend + ' ' + this.endMeridian
    ).toISOString();
    console.log('meeting end',this.meetingEnd,this.mend,this.endMeridian)

    this.isvalidTime = moment(this.meetingEnd).isAfter(this.meetingStart);
    // this.endMeridian = meridian
    console.log('valid time end meridian',this.isvalidTime);
  }



  close() {
    this.mySelect.close();
  }
  matClose() {
    this.mySelect1.close();
  }
  // stakeholderLength() {
  //   console.log(this.stakeHolders.length);

  //   if (this.stakeHolders?.length == 0) {
  //     this._snackBar.open('Please add stakeholder to continue', '', {
  //       duration: 2000,
  //     });
  //   }
  // }
  getCrewStakeholder() {
    this.spinner.show();
    this.http
      .get(
        `${environment.baseurl}/actionactivity/crew-stakeholder/` +
        this.data.description.activityDetails.id
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          console.log(res.data);
          this.activityCrew = res.data.supportCrew;
          console.log('crew', this.activityCrew);
          this.stakeholder = res.data.stakeHolder;
          console.log('stakeholder@@@@@@@@@@@@@', this.stakeholder);

          this.stakeholder.forEach(element => {
            console.log('element', element);
            // this.stakeHolderName = element;
            this.stakeName.push(element.id);
            console.log('name', this.stakeName);
            this.stakeHolderName.push(element.id)
            this.model['stakeHolderName'] = this.stakeHolderName;
            console.log('@@@@@@@@@@@@@', this.model['stakeHolderName']);
            console.log('stakeHolderName', this.stakeHolderName);
          });
          this.activityCrew.forEach(element => {
            console.log('element', element);
            this.crewName.push(element.id);
            this.model['crewName'] = this.crewName;
            console.log('name', this.crewName);
          });
        },
        (err) => console.log(err)
      );
  }
}


