import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/design/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { date } from 'ngx-custom-validators/src/app/date/validator';
import moment from 'moment';
import { DesignService } from '../../design.service';

@Component({
  selector: 'app-current-sprint',
  templateUrl: './current-sprint.component.html',
  styleUrls: ['./current-sprint.component.scss']
})
export class CurrentSprintComponent implements OnInit {
  message: any;
  loadCounter = 0;
  simulator: boolean = false;

  @Input() frequency: any;
  @Input() userSprint: any;
  @Input() sprint;
  @Input() sprintNo;
  @Input() design;
  @Output() isSprintDurationChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private dataService: DataService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private designService: DesignService
  ) { }

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  selectedDuration;
  ngOnInit(): void {
    this.simulator = environment.simulator;
    this.dataService.sharedMessage.subscribe(
      (message) => (this.message = message)
    );

    // this.designService.getTeamSprint().subscribe((res)=>{
    //    this.userSprint = res;
    // })

  }
  ngOnChanges(): void {
    if (this.frequency) {
      this.selectedDuration = this.frequency.duration;
    }
  }

  editFrequency() {
    this.router.navigateByUrl('teams/design/teams-sprint-frquency');
    this.dataService.nextMessage({ isEdit: true });
  }
  onDurationChange(event) {
    // this.loadCounter -= 1;
    // const duration = Number(event.value);

    // // change datetimeto base on dropdown selection
    // this.frequency.datetimeTo = moment(this.frequency.datetimeFrom)
    //   .add('days', duration * 7-1).format('MMM DD YYYY') ;
    //   this.loadCounter -= 1;

    // const datetimeTo =  moment(this.frequency.datetimeTo).format("YYYY-MM-DDTHH:mm:ss.SS[Z]");

    // this.http
    //   .patch(`${environment.baseurl}/usersprint/update-sprint-duration`, {
    //     duration, datetimeTo
    //   })
    const data = {
      "team_id": localStorage.getItem('selectedTeamId'),
      "feedbackFrequency": +event.value,
      "sprint_id": localStorage.getItem("sprint_Id"),
      "startDate": moment(this.userSprint?.startDate).format("DD-MM-YYYY")
    }
    this.designService.updateTeamFeedbackFreqAndEndDate(data).subscribe(
      (res: any) => {
        this.loadCounter -= 1;
        this.openSnackBar(res?.message);
        this.isSprintDurationChanged.emit(true);
      },
      (err) => {
        this.loadCounter -= 1;
        this.openSnackBar('Something went wrong');
      }
    );
  }
  openSnackBar(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }
}
