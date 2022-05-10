import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from '../../../../shared/service/config.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { NgxSpinnerService } from "ngx-spinner";
import moment from 'moment';
import { TeamAddEventComponent } from '../team-add-event/team-add-event.component';
import { TeamEventDataComponent } from '../team-event-data/team-event-data.component';
import { SprintServiceService } from '../../sprint-service.service';

@Component({
  selector: 'app-team-view-event',
  templateUrl: './team-view-event.component.html',
  styleUrls: ['./team-view-event.component.scss']
})
export class TeamViewEventComponent implements OnInit {

  events: any[];
  icons: any;
  colors: any;
  refresh = new Subject();
  activityType: any;
  eventDate: any;
  activityDetails: any;
  isEventAddEnabled: boolean = false;
  isNewEventAdded: boolean = false;
  isAdable: boolean = false;
  timeArray =[];
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public configService: ConfigService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sprintService: SprintServiceService,
    public dialogRef: MatDialogRef<TeamViewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isAdable = data.showBtn;
    for(let data of this.data.events){
      // this.activityDetails = data.description.activityDetails;
      const timeObject ={
        timeFrom:moment( data.start).format('hh:mm'),
        timeTo:moment( data.end).format('hh:mm'),
        fromMeridian:moment( data.start).format('A'),
        toMeridian:moment(data.end).format('A'),

      }
      this.timeArray.push(timeObject);
    }
 
  }


  ngOnInit(): void {
    
  }

  getAllEvents() {
    this.events = [];
    this.spinner.show();
    this.sprintService.getAllEventsByTeamId()
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          for(let item of res){
            this.activityType = item.activity_type;
  
          }
          
          this.refresh.next();
        },
        (err) => {}
      );
  }
  addEvent(){
    const dialogRef = this.dialog.open(TeamAddEventComponent, {
      width: '100%',
      maxWidth: '100%',
      height:'900px',
      data:{data:'',type:'add',from:'calender'}
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      this.isNewEventAdded = result;
      this.onNoClick();
      // this.getAllEvents();     
    });
  }
  viewEventData(data){
    
    const dialogRef = this.dialog.open(TeamEventDataComponent, {
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      height: '100%',
      data:data
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.isNewEventAdded = true;
      this.onNoClick();
    });
  }
  onNoClick(): void {
    this.dialogRef.close({isCancel:true, isNewEventAdded:this.isNewEventAdded});
  }

}

