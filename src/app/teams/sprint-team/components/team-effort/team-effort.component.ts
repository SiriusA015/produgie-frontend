import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/service/config.service';
import { Router } from '@angular/router';
import { SprintServiceService } from '../../sprint-service.service';
import moment from 'moment';
@Component({
  selector: 'app-team-effort',
  templateUrl: './team-effort.component.html',
  styleUrls: ['./team-effort.component.scss']
})
export class TeamEffortComponent implements OnInit {

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
  teamId;
  teamSprint;
  sprintStartDate;
  isSprintStarted: boolean = false;
  pointText = [];
  teamSprintId: string;
  isDesignComplete: any;
  isDesignEdit: any;

  constructor(private http: HttpClient, private sprintService: SprintServiceService,private configService: ConfigService, private router: Router) { }

  ngOnInit(): void {
    this.teamSprintId = localStorage.getItem('sprint_Id');
    this.teamId = localStorage.getItem('selectedTeamId');
    this.data = this.allData[this.slide];
    this.pointText = this.allPointTextArr[this.slide];
    this.getDesignStatus();
  } 
  getDesignStatus() {
    this.configService.setConfig({ isLoader: true });
    this.sprintService.teamDesignStatus().subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      this.isDesignComplete =res.designCompleted;
      this.isDesignEdit = res.designEdit;
      if(this.isDesignComplete){
        this.getSprintData();
        this.getBehaviourOutcomeEffortdData();
        this.getReflectOutcomeEffortdData();
        this.getEnlistOutcomeEffortdData();
        this.getActionOutcomeEffortdData();
      }
    },
    (err) => {
      this.configService.setConfig({ isLoader: false});
      console.error(err);
    })
  }
  getBehaviourOutcomeEffortdData(){
    this.sprintService.getbehaviourOutcomeGraph(this.teamSprintId).subscribe(
      (res: any) => {
        this.configService.setConfig({isLoader: false});
        this.behaviourOutcomeData = res.avgList.map(o => {
          return {
            x: o.outcomeAverage,
            y: o.behaviourAverage
          };
        });

        const pointText = res.avgList.map(o => o.term);
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
    this.sprintService.getReflectOutcomeGraph(this.teamSprintId).subscribe(
      (res: any) => {
        this.configService.setConfig({isLoader: false});
        this.reflectOutcomeData = res.map(o => {
          return {
            x: o.outcomeAverage,
            y: o.reflectAverage
          };
        });
        const pointText = res.map(o => o.text);
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
    this.sprintService.getCrewOutcomeGraph(this.teamSprintId).subscribe(
      (res: any) => {
        this.configService.setConfig({isLoader: false});
        this.reflectOutcomeData = res.avgList.map(o => {
          return {
            x: o.outcomeAverage,
            y: o.crewMemberAverage
          };
        });

        const pointText = res.avgList.map(o => o.term);
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
    this.sprintService.getActionOutcomeGraph(this.teamSprintId).subscribe(
      (res: any) => {
        this.configService.setConfig({isLoader: false});
        this.actionOutcomeData = res.avgList.map(o => {
          return {
            x: o.outcomeAverage,
            y: o.actionAverage
          };
        });

        const pointText = res.avgList.map(o => o.term);//previously it was text
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
  }

  getSprintData() {
    this.configService.setConfig({ isLoader: true });
    this.sprintService.getSprintData(this.teamId).subscribe((res: any) => {
     
      this.teamSprint = res;
      if (res) {        
        this.teamSprintId = localStorage.getItem('sprint_Id');
        
        const sprintStartDate = moment(res.start_date).format('DD-MM-YYYY');
        
        this.sprintStartDate = res.start_date;
        
        const today = moment().format('DD-MM-YYYY');
        if (sprintStartDate <= today) {
          this.isSprintStarted = true;
        }
      }

      this.configService.setConfig({ isLoader: false });
    }, error => {
      this.configService.setConfig({ isLoader: false });
    });
  }
}


