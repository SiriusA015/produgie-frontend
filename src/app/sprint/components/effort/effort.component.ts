import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/service/config.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-effort',
  templateUrl: './effort.component.html',
  styleUrls: ['./effort.component.scss']
})
export class EffortComponent implements OnInit {

  colors = [
    '#4339F2',
    '#FF3A29',
    '#FFB50D',
    '#34B53A',
    // '#770096'
  ];

  data = [];

  allData = [
    [
      // { x: 0, y: 25 },
      // { x: 25, y: 25 },
      // { x: 25, y: 50 },
      // { x: 25, y: 75 },
      // { x: 50, y: 75 }
    ],
    [
      // { x: 10, y: 25 },
      // { x: 25, y: 55 },
      // { x: 65, y: 50 },
      // { x: 25, y: 75 }
    ],
    [
      // { x: 20, y: 25 },
      // { x: 25, y: 25 },
      // { x: 34, y: 50 },
      // { x: 66, y: 20 },
    ],
    [
      // { x: 10, y: 25 },
      // { x: 25, y: 55 },
      // { x: 65, y: 50 },
      // { x: 25, y: 75 }
    ],
    // [
    //   { x: 20, y: 25 },
    //   { x: 25, y: 25 },
    //   { x: 34, y: 50 },
    //   { x: 66, y: 20 },
    // ]
  ];

  allPointTextArr = [[],[],[],[]];

  axisLabel = [
    {
      xAxis: 'Outcomes',
      yAxis: 'Behavior'
    },
    {
      xAxis: 'Outcomes',
      yAxis: 'Reflection'
    },
    {
      xAxis: 'Outcomes',
      yAxis: 'Sprint Crew Engagement'
    },
    {
      xAxis: 'Outcomes',
      yAxis: 'Action'
    }
  ];

  behaviourOutcomeData: any = [];
  reflectOutcomeData: any = [];
  actionOutcomeData: any = [];

  style = {
    'border-bottom-left-radius': '0.5rem',
    'border-bottom-right-radius': '0.5rem'
  };

  slide = 0;
  xAxis = this.axisLabel[0].xAxis;
  yAxis = this.axisLabel[0].yAxis;

  backgroundImage = '/assets/images/bg-graph.svg';

  dataPoint = 100;
  lineWidth = 2;
  pointWidth = 2;
  pointRadius = 10;
  pointColor = '#C9C9C9';
  pointBorderColor = '#C9C9C9';
  lineColor = '#C9C9C9';
  lineNumber = false;
  userSprint: any;
  isStop: any;
  sprintdifference: any;

  pointText = [];
  sprintDay: number;

  constructor(private http: HttpClient, private configService: ConfigService, private router: Router) { }

  ngOnInit(): void {
    this.data = this.allData[this.slide];
    this.pointText = this.allPointTextArr[this.slide];
    this.getUserSprint();
    // this.getBehaviourOutcomeEffortdData();
  }
  getUserSprint() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${environment.baseurl}/usersprint/get-usersprint`).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.userSprint = res.data[0];
          console.log(this.userSprint);
          this.isStop = this.userSprint.isStop;

          const sprintdifference = UtilsService.calculateSecDiffFromUTCnonAbs(this.userSprint.datetimeFrom, new Date().toISOString());
          if (sprintdifference <= 0) {
            this.configService.setConfig({ isLoader: false});
            // this.router.navigate(['/sprint/not-started']);
            this.sprintDay = 0;
    } else {
            this.getBehaviourOutcomeEffortdData();
            this.getReflectOutcomeEffortdData();
            this.getEnlistOutcomeEffortdData();
            this.getActionOutcomeEffortdData();
          }
        }else{
          this.configService.setConfig({ isLoader: false});
        }
      },
      (err) => {
        this.configService.setConfig({ isLoader: false});
        console.error(err);
      }
    );
  }
  getBehaviourOutcomeEffortdData(){
    this.http.get(`${environment.baseurl}/behaviouroutcomeanalytics/effort`).subscribe(
      (res: any) => {
        this.configService.setConfig({isLoader: false});
        console.log(res.data);
        this.behaviourOutcomeData = res.data.map(o => {
          return {
            x: o.outcomeAvg * 20,
            y: o.behaviourAvg * 20
          };
        });
        console.log(this.behaviourOutcomeData);

        const pointText = res.data.map(o => o.text);
        this.allPointTextArr[0] = pointText;
        this.pointText = pointText;
        // this.yAxis = 'Behaviour';
        // this.xAxis = 'Outcome';

        if (this.behaviourOutcomeData.length === 1) {
          this.behaviourOutcomeData.push(this.behaviourOutcomeData[0]);
        }

        this.allData[0] = this.behaviourOutcomeData;
        this.data = this.allData[0];
      },
      err => {
        console.error(err);
      }
    );
  }

  getReflectOutcomeEffortdData(){
    this.http.get(`${environment.baseurl}/behaviouroutcomeanalytics/effort-reflect`).subscribe(
      (res: any) => {
        this.configService.setConfig({isLoader: false});
        console.log(res.data);
        this.reflectOutcomeData = res.data.map(o => {
          return {
            x: o.outcomeAvg,
            y: o.reflectAvg
          };
        });
        console.log(this.reflectOutcomeData);

        const pointText = res.data.map(o => o.text);
        this.allPointTextArr[1] = pointText;

        if (this.reflectOutcomeData.length === 1) {
          this.reflectOutcomeData.push(this.reflectOutcomeData[0]);
        }
        this.allData[1] = this.reflectOutcomeData;

      },
      err => {
        console.error(err);
      }
    );
  }

  getEnlistOutcomeEffortdData(){
    this.http.get(`${environment.baseurl}/behaviouroutcomeanalytics/effort-crew`).subscribe(
      (res: any) => {
        this.configService.setConfig({isLoader: false});
        console.log(res.data);
        this.reflectOutcomeData = res.data.map(o => {
          return {
            x: o.outcomeAvg,
            y: o.crewAvg
          };
        });
        console.log(this.reflectOutcomeData);

        const pointText = res.data.map(o => o.text);
        this.allPointTextArr[2] = pointText;

        if (this.reflectOutcomeData.length === 1) {
          this.reflectOutcomeData.push(this.reflectOutcomeData[0]);
        }
        this.allData[2] = this.reflectOutcomeData;

      },
      err => {
        console.error(err);
      }
    );
  }

  getActionOutcomeEffortdData(){
    this.http.get(`${environment.baseurl}/behaviouroutcomeanalytics/effort-action`).subscribe(
      (res: any) => {
        this.configService.setConfig({isLoader: false});
        console.log(res.data);
        this.actionOutcomeData = res.data.map(o => {
          return {
            x: o.outcomeAvg,
            y: o.actionAvg
          };
        });
        console.log(this.actionOutcomeData);

        const pointText = res.data.map(o => o.text);
        this.allPointTextArr[3] = pointText;

        if (this.actionOutcomeData.length === 1) {
          this.actionOutcomeData.push(this.actionOutcomeData[0]);
        }
        this.allData[3] = this.actionOutcomeData;

      },
      err => {
        console.error(err);
      }
    );
  }

  cycleUp() {
    this.colors.push(this.colors.shift());
    if (this.slide < this.colors.length - 1) {
      this.slide++;
    } else {
      this.slide = 0;
    }
    this.data = this.allData[this.slide];
    this.xAxis = this.axisLabel[this.slide].xAxis;
    this.yAxis = this.axisLabel[this.slide].yAxis;
    this.pointText = this.allPointTextArr[this.slide];
    console.log(this.data);
  }
  cycleDown() {
    this.colors.unshift(this.colors.pop());
    if (this.slide > 0) {
      this.slide--;
    } else {
      this.slide = this.colors.length - 1;
    }
    this.data = this.allData[this.slide];
    this.xAxis = this.axisLabel[this.slide].xAxis;
    this.yAxis = this.axisLabel[this.slide].yAxis;
    this.pointText = this.allPointTextArr[this.slide];
    console.log(this.pointText);

  }
}
