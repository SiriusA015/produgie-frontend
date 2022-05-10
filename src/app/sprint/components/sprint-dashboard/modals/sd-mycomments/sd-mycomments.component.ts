import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import * as _ from 'lodash';
@Component({
  selector: 'app-sd-mycomments',
  templateUrl: './sd-mycomments.component.html',
  styleUrls: ['./sd-mycomments.component.scss'],
})
export class SdMycommentsComponent implements OnInit {
  comments = [];
  allComments = [];
  isLoading = true;
  selectedDate = 'All';
  filteredDate = [];
  dateRange = [];
  userSprint: any;
  constructor(
    public dialogRef: MatDialogRef<SdMycommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAdviceFeedback();
  }
  closeDialog() {
    this.dialogRef.close();
  }
  getAdviceFeedback() {
    this.http.get(`${environment.baseurl}/development/get-af`).subscribe(
      (res: any) => {
        this.allComments = res.data.feedback;
        this.comments = this.allComments;
        this.userSprint = res.data.userSprint[0];
        this.filteredDate = Array(
          Math.ceil((this.userSprint.duration * 7) / this.userSprint.frequency)
        )
          .fill(0)
          .map((x, i) => x + i);
        this.dateRange = this.filteredDate.map((o) => {
          const returnObj = {
            // tslint:disable-next-line:max-line-length
            firstDate: moment(
              moment(this.userSprint.datetimeFrom).add(
                o === 0
                  ? o * this.userSprint.frequency
                  : o * this.userSprint.frequency + 1,
                'd'
              )
            ).toISOString(),
            // tslint:disable-next-line:max-line-length
            secondDate: moment(
              moment(
                moment(this.userSprint.datetimeFrom).add(
                  o * this.userSprint.frequency,
                  'd'
                )
              ).add(this.userSprint.frequency, 'd')
            ).toISOString(),
          };
          return returnObj;
        });
        this.isLoading = false;
      },
      (err) => {
        console.error(err);
        this.isLoading = false;
      }
    );
  }
  onDateChange(event) {
    if (event.target.value === '0') {
      this.comments = [...this.allComments];
    } else {
      const daterange = event.target.value.split(' ');
      this.comments = _.filter(this.allComments, (o) =>
        moment(o.time)
          .subtract(2, 'd')
          .isBetween(moment(daterange[0]), moment(daterange[1]).add(1, 'd'))
      );
    }
    console.log(this.comments);
  }
}
