import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from 'src/app/shared/service/config.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { ConfirmationModalComponent } from '../../../team/confirmation-modal/confirmation-modal.component';
import { environment } from '../../../../../environments/environment';
import { SprintServiceService } from '../../sprint-service.service';
import { TeamAddEventComponent } from '../team-add-event/team-add-event.component';

@Component({
  selector: 'app-team-event-data',
  templateUrl: './team-event-data.component.html',
  styleUrls: ['./team-event-data.component.scss']
})
export class TeamEventDataComponent implements OnInit {
  editData: any;
  timeFrom: string;
  timeTo: string;
  tabEvent: any;
  onlineDiv: boolean = true;
  oflineDiv: boolean = false;
  activityCrew: any;
  stakeholder: any;
  showIcon: boolean =true;
  fromMeridian: string;
  toMeridian: string;
  editTime: any;
  eventData: any;

  constructor(  private http: HttpClient,
    public configService: ConfigService,
    private dialog: MatDialog,
    private sprintService: SprintServiceService,
    public dialogRef: MatDialogRef<TeamEventDataComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) {       
      this.editData = data;
    }

  ngOnInit(): void {
    this.geteventById(); 
    this.timeFrom = moment( this.editData?.description?.activityDetails?.meetingTimeFrom).format('hh:mm')
    this.timeTo = moment(this.editData?.description?.activityDetails?.meetingTimeTo).format('hh:mm')
    this.fromMeridian=moment( this.editData?.description?.activityDetails?.meetingTimeFrom).format('A')
    this.toMeridian=moment( this.editData?.description?.activityDetails?.meetingTimeTo).format('A')
    if(this.editData.title == 'Weekly Check-in' || this.editData.title == 'Feedback'){
      this.showIcon = false;
    }
  }
  geteventById(){
    this.sprintService.viewEventByEventId(this.data.event_id).subscribe((res:any)=>{
      this.eventData = res;
      this.timeFrom = moment( this.eventData.meeting_time_from).format('hh:mm')
      this.timeTo = moment(this.eventData.meeting_time_to).format('hh:mm')
      this.fromMeridian=moment( this.eventData.meeting_time_from).format('A')
      this.toMeridian=moment( this.eventData.meeting_time_to).format('A')
    },error=>{

    })
  }
  opedEditEvent(){
    const dialogRef = this.dialog.open(TeamAddEventComponent, {
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      height: '100%',
      data: {data:this.eventData,type:'edit',from:''}
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.onNoClick();
      this.geteventById();
    });
  }
  opedDeleteEvent(){
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '500px',
      data: { data:this.eventData.id ,type:'delete'}
    });

    dialogRef.afterClosed().subscribe((result) => {
    });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getOnlineEvent(type) {
    this.tabEvent = type;
    this.onlineDiv = true;
    this.oflineDiv = false;
  }
  getOfflineEvent(type) {
    this.tabEvent = type;
    this.oflineDiv = true;
    this.onlineDiv = false;
  }
  // getCrewStakeholder() {
  //   this.spinner.show();
  //   this.http
  //     .get(
  //       'https://produgie-dummy-api.herokuapp.com/sprint/crew-stakeholder/' +
  //       this.editData.description.activityDetails.id
  //     )
  //     .subscribe(
  //       (res: any) => {
  //         this.spinner.hide();
  //         this.activityCrew = res.data.supportCrew;
  //         this.stakeholder = res.data.stakeHolder;
  //       },
  //       (err) => console.log(err)
  //     );
  // }

}



