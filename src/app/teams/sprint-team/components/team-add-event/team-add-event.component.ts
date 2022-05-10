import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Role } from 'src/app/auth/Role';
import { ConfigService } from 'src/app/shared/service/config.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { SprintServiceService } from '../../sprint-service.service';
import { TeamAddStakeholderComponent } from '../../team-add-stakeholder/team-add-stakeholder.component';
interface Week {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-team-add-event',
  templateUrl: './team-add-event.component.html',
  styleUrls: ['./team-add-event.component.scss']
})
export class TeamAddEventComponent implements OnInit {

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
    action: '',
    title: '',
    from: '',
    to: '',
    link: '',
    address: '',
    description: '',
    eventTitle: '',
    date: '',
    fromMeridian: '',
    toMeridian: '',
    meetingfrom: '',
    meetingTo: '',
    code: '',
    stake_holders_id: [],
    crew_members_id: []

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
  isValidLink: boolean = true;
  validLink: boolean = true;
  errorMsg: string;
  currentDate: Date = new Date();
  newEventdate: string;
  newCurrentDate: string;
  currentTime: string;
  currentMeridian: string;
  currentDateTime: string;
  selectedActions: any;
  teamSprintId: string;
  teamId: string;
  selectedActionData: any;
  activityId: any;
  crew: any;
  isCustom: any;
  teamSprint: any;
  selectedActionsFromRoadmap: any;
  isEventStore: boolean = false;
  
  constructor(public dialogRef: MatDialogRef<TeamAddEventComponent>, private dialog: MatDialog, private sprintService: SprintServiceService, private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, public configService: ConfigService, public router: Router, private http: HttpClient,) {
    
  }
  timezone: Week[] = [
    { value: 'AM', viewValue: 'AM' },
    { value: 'PM', viewValue: 'PM' },
  ]
  ngOnInit(): void {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.teamSprintId = localStorage.getItem('sprint_Id');
    this.getSprintData();
    if(this.data.type == 'add' && this.data.from == 'roadmap'){
      this.selectedActionData = this.data.data;
      this.activityDiv = true;
    }
    if (this.data.type == 'edit') {
      this.model = {
        action: '',
        code: this.data?.data?.activity_type?.code,
        stake_holders_id: this.data?.data?.stake_holders?.map(data => data.id),
        crew_members_id: this.data?.data?.crew_members?.map(data => data.id),
        title: this.data.data.activity_type.title,
        date: this.data.data.meeting_date,
        from: moment(this.data.data.meeting_time_from).format('hh:mm'),
        to: moment(this.data.data.meeting_time_to).format('hh:mm'),
        fromMeridian: moment(this.data.data.meeting_time_from).format('A'),
        toMeridian: moment(this.data.data.meeting_time_to).format('A'),
        link: this.data.data.meeting_url,
        eventTitle: this.data.data.activity_type.eventTitle,
        address: this.data.data.address,
        description: this.data.data.description,
        meetingfrom: UtilsService.getDateTime(
          this.data.data.meeting_date,
          moment(this.data.data.meeting_time_from).format('hh:mm') + ' ' + moment(this.data.data.meeting_time_from).format('A')
        ).toISOString()
        ,
        meetingTo: UtilsService.getDateTime(
          this.data.data.meeting_date,
          moment(this.data.data.meeting_time_to).format('hh:mm') + ' ' + moment(this.data.data.meeting_time_to).format('A')
        ).toISOString(),

      };
      
      this.mstart = this.model.from;
      this.startMeridian = this.model.fromMeridian;
      this.mend = this.model.to;
      this.endMeridian = this.model.toMeridian;
      this.eventDate = this.model.date;
      this.meetingStart = UtilsService.getDateTime(
        this.eventDate ? this.eventDate : this.model.date,
        this.model.from + ' ' + this.model.fromMeridian
      ).toISOString();
      this.meetingEnd = UtilsService.getDateTime(
        this.eventDate ? this.eventDate : this.model.date,
        this.model.to + ' ' + this.model.toMeridian
      ).toISOString();
      
      this.isvalidTime = moment(this.model.meetingTo).isAfter(this.model.meetingfrom);
      this.newEventdate = moment(this.model.date).format('MM/DD/YYYY');
      this.newCurrentDate = moment(this.currentDate).format('MM/DD/YYYY');
      if (this.newEventdate == this.newCurrentDate) {
        this.todayDate = this.currentDate;
        this.currentDate.toLocaleTimeString();
        this.currentTime = moment(this.currentDate).format('hh:mm');
        this.currentMeridian = moment(this.currentDate).format('A');
      }
      this.selectedActionData = this.data.data.selected_action.id;
      this.activityId = this.data.data.activity_type.id;
      this.crew = this.data.data.crew_members;
      this.stakeHolder = this.data.data.stake_holders;
      this.tabValue = this.data.data.is_online;
      if (this.data.data.is_online == true) {
        this.onlineDiv = true;
        this.oflineDiv = false;
      }
      else{
        this.onlineDiv = false;
        this.oflineDiv = true;
      }
      this.activityDiv = true;
      this.showDateDiv = true;
      this.toggleVariable(this.data.data.activity_type.code);
    }

    this.minCurrentDate = new Date();
    for (let i = 1; i <= 12; i++) {
      this.timeslots.push({ value: ("0" + i).slice(-2) + ':00', viewValue: ("0" + i).slice(-2) + ':00' })
      this.timeslots.push({ value: ("0" + i).slice(-2) + ':30', viewValue: ("0" + i).slice(-2) + ':30' })
    }
    this.getSelectedActionData();
    this.getActivity();
  }


  getSprintData() {
      const activeRole = localStorage.getItem('Role')
    
      if(activeRole == Role.TEAM_MEMBER){
      this.teamId = localStorage.getItem('membertid')
      } else {
        this.teamId = localStorage.getItem('selectedTeamId')
      }
    this.sprintService.getSprintData(this.teamId).subscribe((res: any) => {
      this.teamSprint = res;
      this.lastAddDateForEvent = res.end_date;
      const day: any = moment(this.lastAddDateForEvent).format('DD');
      const month: any = moment(this.lastAddDateForEvent).format('MM');
      const year: any = moment(this.lastAddDateForEvent).format('YYYY');
      this.lastAddDateForEvent = new Date(year, month - 1, day);      
    },error=>{})
  }

  getSelectedActionData() {
    this.sprintService.getAllProgressData(this.teamSprintId).subscribe((res: any) => {
      this.selectedActions = res;
      this.selectedActionsFromRoadmap = res.filter(data=>data.selected_action_id == this.data.data)      
    }, error => {})
  }
  getActivity() {
    this.sprintService.getAllActivity().subscribe((res: any) => {
      this.activity = res.types;

    }, error => {})
  }

  onNoClick(): void {
    this.dialogRef.close(this.isEventStore);
  }
  onGetActivity(event) {
    this.activityData = event.value;
    this.selectedActionData = event.value.selected_action_id;
    this.isCustom = event.value.isCustom;
    this.activityDiv = true;

  }
  getOptions(event) {
    const activityObj = this.activity.filter(data => data.code == event.value)
    this.activityId = activityObj[0].id;

    this.showDateDiv = true;
    this.toggleVariable(event.value);
  }
  toggleVariable(code) {
    if (code == 'ESC') {
      this.getCrewData();
      this.showCrewDiv = true;
      this.showStakeDiv = false;
      this.meetingDiv = true;
      this.actionType = "ESC";
      this.model.eventTitle = "Engage With Sprint Crew Member";
    }
    if (code == 'ACS') {
      this.getStakeHoldersData();
      this.showStakeDiv = true;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "ACS";
      this.model.eventTitle = "Align & Communicate Action With Stakeholder";
    }
    if (code == 'SDL') {
      this.showStakeDiv = false;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "SDL";
      this.model.eventTitle = "Self Directed Learning";
    }
    if (code == 'FSL') {
      this.showStakeDiv = false;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "FSL";
      this.model.eventTitle = "Formal/Structured Learning";
    }
    if (code == 'OTH') {
      this.showStakeDiv = false;
      this.showCrewDiv = false;
      this.meetingDiv = true;
      this.actionType = "OTH";
      this.model.eventTitle = "Other";
    }
  }
  openBottomSheet(): void {
    const dialogRef = this.dialog.open(TeamAddStakeholderComponent, {
      width: '100%',
      maxWidth: '100%',
      data: { data: this.selectedActionData,isCustom:this.isCustom  }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getStakeHoldersData();

    });

  }
  getCrewData() {
    this.spinner.show();
    this.sprintService.getCrewMember(this.teamSprintId)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.crewMember = res;

        },
        (err) => {
          this.spinner.hide();
        })
  }
  getStakeHoldersData() {
    this.spinner.show();
    this.sprintService.getStakeholder(this.teamSprintId)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.stakeHolders = res;
          this.stakeHolders.sort((a, b) => a.name.localeCompare(b.name));          
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
    this.newEventdate = moment(this.eventDate).format('MM/DD/YYYY');
    this.newCurrentDate = moment(this.currentDate).format('MM/DD/YYYY');
    if (this.newEventdate == this.newCurrentDate) {
      this.currentDate.toLocaleTimeString();
      this.currentTime = moment(this.currentDate).format('hh:mm');
      this.currentMeridian = moment(this.currentDate).format('A');
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
    let stakeholderArr = []
    this.stakeHolders?.forEach(element => {
      if (event.value.includes(element.id)) {
        stakeholderArr.push(element)
      }
    });
    this.stakeHolder = stakeholderArr;
  }
  getCrewId(event) {
    let crewArr = []
    this.crewMember?.forEach(element => {
      if (event.value.includes(element.id)) {
        crewArr.push(element)
      }
    });
    this.crew = crewArr;
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

  ceateEvent() {        
    const substring = "https://";
    const sub = "http://"
    this.isValidLink = this.form.value.link != null && this.form.value.link != "--" && this.form.value.link != " " ? this.form.value.link.includes(substring) : true;
    this.validLink = this.form.value.link != null && this.form.value.link != "--" && this.form.value.link != " " ? this.form.value.link.includes(sub) : true;
    if (this.isValidLink == false && this.validLink == false &&  this.tabEvent == 'Online') {
      this._snackBar.open('Please include https:// or http:// in your link', '', {
        duration: 3000,
      });
      return;
    }
    if (this.form.value.link == "" || (this.form.value.link == undefined && this.tabEvent == true)) {
      this._snackBar.open('Link is Mandatory', '', {
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
    else if (this.eventDate == undefined) {
      this._snackBar.open('Please select date and time', '', {
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
    else if ((this.actionType == 'ACS' && this.stakeHolder == null)) {
      this._snackBar.open('Please add stakeholder to continue', '', {
        duration: 3000,
      });
      return;
    }
    else if (this.actionType == 'ESC' && this.crew == null) {
      this._snackBar.open('Please add crew to continue', '', {
        duration: 3000,
      });
      return;
    }
    else if (this.newEventdate == this.newCurrentDate) {
      this.currentDateTime = moment.utc(new Date()).toISOString();
      this.currentDate.toLocaleTimeString();
      this.currentTime = moment(this.currentDate).format('hh:mm');
      this.currentMeridian = moment(this.currentDate).format('A');
      if (!(moment(this.meetingStart).isAfter(this.currentDateTime))) {
        this._snackBar.open('Past start time and end time are not allowed', '', {
          duration: 3000,
        });
        return;
      }
      else {
        let data = {
          activity_type_id: this.activityId,
          selected_action_id: this.selectedActionData,
          team_id: this.teamId,
          is_online: this.tabValue,
          description: this.model.description ? this.model.description : null,
          meeting_time_from: this.meetingStart,
          meeting_time_to: this.meetingEnd,
          title: this.model.eventTitle,
          meeting_date: this.eventDate,
          address: this.model.address ? this.model.address : null,
          meeting_url: this.model.link ? this.model.link : null,
          crew_members: this.crew ? this.crew : null,
          stake_members: this.stakeHolder ? this.stakeHolder : null,

        }
        if (this.data.type == 'edit') {
        if(this.actionType == 'ACS' && data.stake_members?.length == 0){
          this._snackBar.open('Please add stakeholder to continue', '', {
            duration: 3000,
          });
          return;
        }
        if(this.actionType == 'ESC' && data.crew_members?.length == 0){
          this._snackBar.open('Please add crew to continue', '', {
            duration: 3000,
          });
          return;
        }
      }
      //  this.spinner.show();
        if (this.data.type == 'edit') {
          this.sprintService.updateEvent(data,this.data.data.id).subscribe(
            (res: any) => {
            //  this.spinner.hide();
              this.isEventStore = true;
              this.onNoClick();
            },
            (err) => {
              this.spinner.hide();
            })
        }
        else {
          this.sprintService.createEvent(data).subscribe(
            (res: any) => {
         //     this.spinner.hide();
              this.isEventStore = true;
              this.onNoClick();
            },
            (err) => {
            //  this.spinner.hide();

            })
        }
      }
    }
    else {
      let data = {
        activity_type_id: this.activityId,
        selected_action_id: this.selectedActionData,
        team_id: this.teamId,
        is_online: this.tabValue,
        description: this.model.description ? this.model.description : null,
        meeting_time_from: this.meetingStart,
        meeting_time_to: this.meetingEnd,
        title: this.model.eventTitle,
        meeting_date: this.eventDate,
        address: this.model.address ? this.model.address : null,
        meeting_url: this.model.link ? this.model.link : null,
        crew_members: this.crew ? this.crew : null,
        stake_members: this.stakeHolder ? this.stakeHolder : null,

      }
      if (this.data.type == 'edit') {
        if(this.actionType == 'ACS' && data.stake_members?.length == 0){
          this._snackBar.open('Please add stakeholder to continue', '', {
            duration: 3000,
          });
          return;
        }
        if(this.actionType == 'ESC' && data.crew_members?.length == 0){
          this._snackBar.open('Please add crew to continue', '', {
            duration: 3000,
          });
          return;
        }
      }
      this.spinner.show();
      if (this.data.type == 'edit') {
        this.sprintService.updateEvent(data,this.data.data.id).subscribe(
          (res: any) => {
            this.spinner.hide();
            this.isEventStore = true;
            this.onNoClick();
          },
          (err) => {
            this.spinner.hide();
          })
      }
      else {
        this.sprintService.createEvent(data).subscribe(
          (res: any) => {
            this.isEventStore = true;
            this.onNoClick();
          },
          (err) => {
            this.spinner.hide();
          })
      }
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
        duration: 2000,
      });
    }
  }
}



