import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/service/config.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-not-started-sprint',
  templateUrl: './not-started-sprint.component.html',
  styleUrls: ['./not-started-sprint.component.scss']
})
export class NotStartedSprintComponent implements OnInit {

  userSprint: any;
  isStop: any;
  totalSprintDurationDays: any[];
  totalSprintDurationMonths: any[];
  data: number[];
  sprintDay: number;
  isEndDate: boolean;
  constructor(private configService: ConfigService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserSprint();
  }

  getUserSprint() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${environment.baseurl}/usersprint/get-usersprint`).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.userSprint = res.data[0];
          this.isStop = this.userSprint.isStop;
          this.totalSprintDurationDays = Array(this.userSprint.duration * 7)
            .fill(1)
            .map((x, i) => x + i);
          this.totalSprintDurationMonths = Array(Math.ceil(this.userSprint.duration / 4))
            .fill(1)
            .map((x, i) => x + i);
          this.data = Array(Math.ceil(this.userSprint.duration / 2))
            .fill(1)
            .map((x, i) => 14 * i);
            this.configService.setConfig({ isLoader: false });
          const sprintdifference = UtilsService.calculateDayDiffFromUTCnonAbs(this.userSprint.datetimeFrom, new Date().toISOString());
          if (sprintdifference < 0) {
            this.sprintDay = 0;
          } else {
            this.sprintDay =
              UtilsService.calculateDayDiffFromUTC(
                new Date().toISOString(),
                this.userSprint.datetimeFrom
              ) + 1;
          }
          if (this.sprintDay === this.userSprint.duration * 7) {
            this.isEndDate = true;
          }
          this.configService.setConfig({ isLoader: false });
        } else {
          this.configService.setConfig({ isLoader: false });
        }
      },
      (err) => {
        console.error(err);
        this.configService.setConfig({ isLoader: false });
      }
    );
  }
  getselectedactions() {
    throw new Error('Method not implemented.');
  }

}
