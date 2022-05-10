import { Component, OnInit, Inject } from '@angular/core';
import { EditEventDataComponent } from '../edit-event-data/edit-event-data.component';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from '../../../shared/service/config.service';
import { Router } from '@angular/router';
import moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-view-event-data',
  templateUrl: './view-event-data.component.html',
  styleUrls: ['./view-event-data.component.scss']
})
export class ViewEventDataComponent implements OnInit {
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

  constructor(  private http: HttpClient,
    private dialog: MatDialog,
    public configService: ConfigService,
    private router: Router,
    public dialogRef: MatDialogRef<ViewEventDataComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.editData = data;
     }

  ngOnInit(): void {
    this.timeFrom = moment( this.editData.description.activityDetails.meetingTimeFrom).format('hh:mm')
    this.timeTo = moment(this.editData.description.activityDetails.meetingTimeTo).format('hh:mm')
    this.fromMeridian=moment( this.editData.description.activityDetails.meetingTimeFrom).format('A')
    this.toMeridian=moment( this.editData.description.activityDetails.meetingTimeTo).format('A')
   
    if(this.editData.title == 'Weekly Check-in' || this.editData.title == 'Feedback'){
      this.showIcon = false;
    }
     this.getCrewStakeholder(); 
  }
  opedEditEvent(){
    const dialogRef = this.dialog.open(EditEventDataComponent, {
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      height: '100%',
      data:this.data
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.onNoClick();
      this.getAllEvents();
    });
  }
  opedDeleteEvent(){
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '100%',
      maxWidth: '100%',
      data:this.data
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.onNoClick();
      this.getAllEvents();
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllEvents() {
    this.spinner.show();
    this.http
      .get(`${environment.baseurl}/actionactivity/get-by-date`)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          
        },
        (err) => console.log(err)
      );
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
  getCrewStakeholder() {
    this.spinner.show();
    this.http
      .get(
        `${environment.baseurl}/actionactivity/crew-stakeholder/` +
        this.editData.description.activityDetails.id
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.activityCrew = res.data.supportCrew;
          this.stakeholder = res.data.stakeHolder;
          },
        (err) => console.log(err)
      );
  }

}
