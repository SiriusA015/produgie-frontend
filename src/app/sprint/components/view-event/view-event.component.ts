import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from '../../../shared/service/config.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { NgxSpinnerService } from "ngx-spinner";
import { AddEventComponent } from '../add-event/add-event.component';
import { ViewEventDataComponent } from '../view-event-data/view-event-data.component';
import moment from 'moment';
// export interface viewEvent {
//  data:string;
// }
@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  events: any[];
  icons: any;
  colors: any;
  refresh = new Subject();
  activityType: any;
  eventDate: any;
  activityDetails: any;
  isEventAddEnabled: boolean = false;
  isNewEventAdded: boolean = false;
  timeArray =[];
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public configService: ConfigService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<ViewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    for(let data of this.data.events){
      this.activityDetails = data.description.activityDetails;
      const timeObject ={
        timeFrom:moment( this.activityDetails.meetingTimeFrom).format('hh:mm'),
        timeTo:moment(this.activityDetails.meetingTimeTo).format('hh:mm'),
        fromMeridian:moment( this.activityDetails.meetingTimeFrom).format('A'),
        toMeridian:moment( this.activityDetails.meetingTimeTo).format('A'),

      }
      this.timeArray.push(timeObject);
    }
 
  }


  ngOnInit(): void {
    this.eventDate = this.data.date;
    this.isEventAddEnabled = this.data.showBtn;
    
    // this.getAllEvents();
  }

  getAllEvents() {
    this.events = [];
    this.spinner.show();
    this.http
      .get(`${environment.baseurl}/actionactivity/get-by-date`)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          for(let item of res.data){
            this.activityType = item.activity;
  
          }
          
          this.refresh.next();
        },
        (err) => console.log(err)
      );
  }
  addEvent(){
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '100%',
      maxWidth: '100%',
      height:'900px',
    });
    this.onNoClick();
    dialogRef.afterClosed().subscribe((result) => {
        this.isNewEventAdded = true;
      this.getAllEvents();     
    });
  }
  viewEventData(data){
    const dialogRef = this.dialog.open(ViewEventDataComponent, {
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      height: '100%',
      data:data
    });
    dialogRef.afterClosed().subscribe((result) => {
     });
  }
  onNoClick(): void {
    this.dialogRef.close({isCancel:true, isNewEventAdded:this.isNewEventAdded});
  }

}

