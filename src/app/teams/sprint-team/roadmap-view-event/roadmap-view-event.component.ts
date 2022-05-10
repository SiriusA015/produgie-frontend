import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { TeamAddEventComponent } from '../components/team-add-event/team-add-event.component';
import { RoadmapViewComponent } from '../roadmap-view/roadmap-view.component';
import { SprintServiceService } from '../sprint-service.service';

@Component({
  selector: 'app-roadmap-view-event',
  templateUrl: './roadmap-view-event.component.html',
  styleUrls: ['./roadmap-view-event.component.scss']
})
export class RoadmapViewEventComponent implements OnInit {
  eventData: any;
  timeArray = [];

  constructor(public dialogRef: MatDialogRef<RoadmapViewEventComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private sprintService: SprintServiceService,) {
    console.log(data);

  }
  ngOnInit(): void {
    this.getEventsByActionId();
  }
  getEventsByActionId() {
    this.sprintService.getEventsByActionId(this.data).subscribe((res: any) => {
      console.log(res);
      this.eventData = res;
      for (let data of this.eventData) {
        const timeObject = {
          timeFrom : moment(data.meeting_time_from).format('hh:mm'),
          timeTo : moment(data.meeting_time_to).format('hh:mm'),
          fromMeridian:moment(data.meeting_time_from).format('A'),
          toMeridian:moment(data.meeting_time_to).format('A'),
          selectedActionId:data.selected_action_id

        }
        this.timeArray.push(timeObject);
      }
      console.log('timeArray', this.timeArray)
    }, error => {

    })
  }
  viewEventDetails(data) {
    const dialogRef = this.dialog.open(RoadmapViewComponent
      , {
        width: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        height: '100%',
        data: data
      });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }
  addEvent() {
    const dialogRef = this.dialog.open(TeamAddEventComponent
      , {
        width: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        height: '100%',
        data: { data:this.data, type: 'add',from:'roadmap' }
      });

    dialogRef.afterClosed().subscribe((result) => {     
        this.onNoClick();     
    }); 
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
