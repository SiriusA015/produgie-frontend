import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/design/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { date } from 'ngx-custom-validators/src/app/date/validator';
import moment from 'moment';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss'],
})
export class DesignSnapshotComponent implements OnInit {
  message: any;
  loadCounter = 0;
  simulator: boolean = false;

  @Input() frequency: any;
  @Input() userSprint: any;
  @Input() sprint;
  @Input() sprintNo;

  constructor(
    private router: Router,
    private dataService: DataService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  selectedDuration = '';
  ngOnInit(): void {
    this.simulator = environment.simulator;
    console.log(this.userSprint, 'value');
    this.dataService.sharedMessage.subscribe(
      (message) => (this.message = message)
    );
  }
  ngOnChanges(): void {
    if (this.frequency) {
      this.selectedDuration = this.frequency.duration.toString();
    }
  }

  editFrequency() {
    this.router.navigateByUrl('/design/sprint-frequency');
    this.dataService.nextMessage({ isEdit: true, isSprint: true });
  }
  onDurationChange(event) {
    this.loadCounter += 1;
    const duration = Number(event.value);

    // change datetimeto base on dropdown selection
    this.frequency.datetimeTo = moment(this.frequency.datetimeFrom)
      .add('days', duration * 7-1).format('MMM DD YYYY') ;

    const datetimeTo =  moment(this.frequency.datetimeTo).format("YYYY-MM-DDTHH:mm:ss.SS[Z]");

    this.http
      .patch(`${environment.baseurl}/usersprint/update-sprint-duration`, {
        duration, datetimeTo
      })
      .subscribe(
        (res: any) => {
          this.loadCounter -= 1;
          this.openSnackBar('Updated Successfully');
        },
        (err) => {
          this.loadCounter -= 1;
          this.openSnackBar('Something went wrong');
        }
      );
  }
  openSnackBar(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 1500,
    });
  }
}
