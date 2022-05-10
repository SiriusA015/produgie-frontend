import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationModalComponent } from '../../team/confirmation-modal/confirmation-modal.component';
import { TeamAddEventComponent } from '../components/team-add-event/team-add-event.component';
import { SprintServiceService } from '../sprint-service.service';

@Component({
  selector: 'app-roadmap-view',
  templateUrl: './roadmap-view.component.html',
  styleUrls: ['./roadmap-view.component.scss']
})
export class RoadmapViewComponent implements OnInit {
  eventData: any;
  timeFrom: string;
  timeTo: string;
  fromMeridian: string;
  toMeridian: string;
  tabEvent: any;
  onlineDiv: boolean;
  oflineDiv: boolean;

  constructor(  private dialog: MatDialog, private spinner: NgxSpinnerService,private sprintService: SprintServiceService,public dialogRef: MatDialogRef<RoadmapViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit(): void {
    this.geteventById();
   
  }
  geteventById(){
    this.spinner.show();
    this.sprintService.viewEventByEventId(this.data.id).subscribe((res:any)=>{
      console.log(res);
      this.spinner.hide();
      this.eventData = res;
      console.log({res});
      this.timeFrom = moment( this.eventData.meeting_time_from).format('hh:mm')
      this.timeTo = moment(this.eventData.meeting_time_to).format('hh:mm')
      this.fromMeridian=moment( this.eventData.meeting_time_from).format('A')
      this.toMeridian=moment( this.eventData.meeting_time_to).format('A')
      console.log(this.timeFrom,this.timeTo,this.fromMeridian,this.toMeridian);
      
    },error=>{
      this.spinner.hide();

    })
  }
  opedEditEvent(){
    const dialogRef = this.dialog.open(TeamAddEventComponent
      , {
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      height: '100%',
      data: {data:this.eventData,type:'edit',from:'roadmap'}
    });

    dialogRef.afterClosed().subscribe((result) => {

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
  onNoClick(){
    this.dialogRef.close();
  }

}
