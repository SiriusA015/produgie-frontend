import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/service/config.service';
import { Router } from '@angular/router';
import { SprintServiceService } from '../../sprint-service.service';

@Component({
  selector: 'app-team-trends',
  templateUrl: './team-trends.component.html',
  styleUrls: ['./team-trends.component.scss']
})
export class TeamTrendsComponent implements OnInit {

  title = 'Actions';
  frequency = 0;

  data = [
    [65, 70, 80],
    [56, 59, 75],
    [20, 40, 60],
  ];

  actionStyle = {
    backgroundColor: '#3D5DFF0D',
    borderColor: '#3D5DFF',
    textColor: '#3D5DFF'
  };

  behaviourStyle = {
    backgroundColor: '##FF3A290D',
    borderColor: '#FF3A29',
    textColor: '#FF3A29'
  };

  outcomeStyle = {
    backgroundColor: '#7700960D',
    borderColor: '#770096',
    textColor: '#770096'
  };

  reflectStyle = {
    backgroundColor: '#34B53A0D',
    borderColor: '#34B53A',
    textColor: '#34B53A'
  };

  enlistStyle = {
    backgroundColor: '#FFB50D0D',
    borderColor: '#FFB50D',
    textColor: '#FFB50D'
  };


  labesls = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];
  labesls2 = ['W1', 'W2', 'W3'];

  behaviour: any = [];
  behaviourLabel: any = [];
  behaviourLegend: any = [];

  outcome: any = [];
  outcomeLabel: any = [];
  outcomeLegend: any = [];

  reflect: any = [];
  reflectLabel: any[] = [];

  enlist: any = [];
  enlistLabel: any[] = [];

  action: any = [];
  actionLabel: any[] = [];



  legends = [
    {
      title: 'Interview Stakeholders',
      description: 'Interview or conduct survey of stakeholders to identify value your group adds to them today and how you can add more value in future'
    },
    {
      title: 'Actively Listen',
      description: 'Actively listen to others throughout the process and ask how they are feeling about the purpose, what motivates them, etc.'
    },
    {
      title: 'Actively Listen',
      description: 'Actively listen to others throughout the process and ask how they are feeling about the purpose, what motivates them, etc.'
    }
  ];
  userSprint: any;
  isStop: any;
  sprintdifference: number;
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[]
  lineChartOptions: (ChartOptions);
  
  lineChartColors: Color[];
  lineChartData1 =[];
  lineChartLabels1: Label[]
  lineChartOptions1: (ChartOptions);
  
  lineChartColors1: Color[];
  lineChartData2 =[];
  lineChartLabels2: Label[]
  lineChartOptions2: (ChartOptions);
  
  lineChartColors2: Color[];
  lineChartData3 =[];
  lineChartLabels3: Label[]
  lineChartOptions3: (ChartOptions);
  
  lineChartColors3: Color[];
  lineChartData4 =[];
  lineChartLabels4: Label[]
  lineChartOptions4: (ChartOptions);
  
  lineChartColors4: Color[];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];
  actionGraph: any;
  enlistGraph: any;
  reflectGraph: any;
  behaviorGraph: any;
  outcomeGraph: any;
  behaviourArray: any[];
  outComesArray: any[];
  outComeTerm: any[];
  behaviourTerm: any;
  teamSprintId: string;
  isDesignComplete: any;
  isDesignEdit: any;
  teamId: string;
  teamSprint;
  sprintStartDate;
  isSprintStarted: boolean = false;
  
  constructor(private http: HttpClient, private sprintService: SprintServiceService, private configService: ConfigService, private router: Router) { }

  ngOnInit(): void {
   
    this.teamSprintId = localStorage.getItem('sprint_Id');
    this.teamId = localStorage.getItem('selectedTeamId');
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
        this.getActionTrendData();
        this.getBehaviourTrendData();
        this.getOutcomeTrendData();
        this.getReflectTrendData();
        this.getEnlistTrendData();
      }
    },
    (err) => {
      this.configService.setConfig({ isLoader: false});
      console.error(err);
    })
  }
  getOutcomeTrendData() {
    this.sprintService.getOutcomeGraph(this.teamSprintId).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.outcomeGraph = res;
        this.outcomeGraph.sort((a,b) => (a.feedbackTermDate > b.feedbackTermDate) ? 1 : ((b.feedbackTermDate> a.feedbackTermDate) ? -1 : 0));
        this.outcomeLabel = this.outcomeGraph.map(o => moment(o.feedbackTermDate).format('DD-MMM'));
        this.outcomeLabel=  this.outcomeLabel.filter( function( item, index, inputArray ) {
          return inputArray.indexOf(item) == index;
   });
        this.outcome = this.outcomeGraph.map(o => o.percentage);
        this.getOutComesgraph();
      },
      err => {
        if(err.status == 404){
          this.outcomeGraph =[];
        }
        console.error(err);
      }
    );
  }
 

  getBehaviourTrendData() {
    this.sprintService.getBehaviourGraph(this.teamSprintId).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.behaviorGraph = res;
        this.behaviorGraph.sort((a,b) => (a.feedbackDate > b.feedbackDate) ? 1 : ((b.feedbackDate> a.feedbackDate) ? -1 : 0));
        
        // this.actionLabel = res.data.map(o => 'T' + o.term);
        this.behaviourLabel = this.behaviorGraph.map(o => moment(o.feedbackDate).format('DD-MMM'));
        this.behaviourLabel=  this.behaviourLabel.filter( function( item, index, inputArray ) {
          return inputArray.indexOf(item) == index;
   });
        this.behaviour = this.behaviorGraph.map(o => o.percentage);
      
        this.getBehavioursgraph();
      },
      err => {
        if(err.status == 404){
          this.behaviorGraph =[];
        }
        console.error(err);
      }
    );
  }

  getReflectTrendData() {
    this.sprintService.getReflectGraph(this.teamSprintId).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.reflectGraph = res;
        // this.reflectLabel = res.data.map(o => o.term);
        this.reflectLabel = res.map(o => moment(o.feedbackTermDate).format('DD-MMM'));

        this.reflect = res.map(o => o.percentage);
        this.getReflectsgraph();
      }, err => { 
        console.error('reflect graph error',err);
        if(err.status == 404){
          this.reflectGraph =[];
        }
       
      });
  }

  getEnlistTrendData() {
    this.sprintService.getEnlistGraph(this.teamSprintId).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.enlistGraph = res;
        this.enlistGraph.sort((a,b) => (a.termDate > b.termDate) ? 1 : ((b.termDate> a.termDate) ? -1 : 0));
        // this.enlistLabel = res.data.map(o => o.term);
        this.enlistLabel =this.enlistGraph.map(o => moment(o.termDate).format('DD-MMM'));

        this.enlist = this.enlistGraph.map(o => o.percentage);
        this.getEnlistsgraph();
    },
    err => {
      if(err.status == 404){
        this.enlistGraph =[];
      }
      console.error(err);
    })
    
  }

  getActionTrendData() {
    this.sprintService.getActionGraph(this.teamSprintId).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.actionGraph = res;
        this.actionGraph.sort((a,b) => (a.actionDate > b.actionDate) ? 1 : ((b.actionDate> a.actionDate) ? -1 : 0));
        this.actionLabel = this.actionGraph.map(o => moment(o.actionDate).format('DD-MMM'));
        this.actionLabel=  this.actionLabel.filter( function( item, index, inputArray ) {
          return inputArray.indexOf(item) == index;
   });
        this.action = this.actionGraph.map(o => o.percentage);
        this.getActionsgraph();
      },
      err => {
        if(err.status == 404){
          this.actionGraph =[];
        }
      }
    );
  }
  // setData() {
  //   let res = {
  //     "success": true,
  //     "status": 200,
  //     "data": [
  //       {
  //         "id": 32,
  //         "assessmentId": 122,
  //         "date": "2021-02-18T18:30:00.00Z",
  //         "totalAction": 1,
  //         "totalFinished": 0,
  //         "allStartedAction": 0,
  //         "actionNotStarted": 1,
  //         "notFinishedAction": 0,
  //         "actionWithNoActivity": 0,
  //         "actionWithOneActivity": 0,
  //         "actionWithTwoActivity": 0,
  //         "score": 4,
  //         "total": 4,
  //         "average": 0,
  //         "term": 1,
  //         "createdAt": "2021-02-18T18:59:58.00Z",
  //         "updatedAt": "2021-02-18T18:59:58.00Z"
  //       },
  //       {
  //         "id": 44,
  //         "assessmentId": 122,
  //         "date": "2021-02-25T18:30:00.00Z",
  //         "totalAction": 1,
  //         "totalFinished": 0,
  //         "allStartedAction": 0,
  //         "actionNotStarted": 1,
  //         "notFinishedAction": 0,
  //         "actionWithNoActivity": 0,
  //         "actionWithOneActivity": 0,
  //         "actionWithTwoActivity": 0,
  //         "score": 0,
  //         "total": 4,
  //         "average": 0,
  //         "term": 2,
  //         "createdAt": "2021-02-25T18:30:04.00Z",
  //         "updatedAt": "2021-02-25T18:30:04.00Z"
  //       },
  //       {
  //         "id": 57,
  //         "assessmentId": 122,
  //         "date": "2021-03-04T18:30:00.00Z",
  //         "totalAction": 1,
  //         "totalFinished": 3,
  //         "allStartedAction": 4,
  //         "actionNotStarted": 1,
  //         "notFinishedAction": 0,
  //         "actionWithNoActivity": 0,
  //         "actionWithOneActivity": 0,
  //         "actionWithTwoActivity": 0,
  //         "score": 10,
  //         "total": 4,
  //         "average": 2,
  //         "term": 3,
  //         "createdAt": "2021-03-04T18:30:11.00Z",
  //         "updatedAt": "2021-03-04T18:30:11.00Z"
  //       }
  //     ]
  //   }
  //   this.configService.setConfig({ isLoader: false });

  //   // this.actionLabel = res.data.map(o => 'T' + o.term);
  //   this.actionLabel = res.data.map(o => moment(o.date).format('DD-MMM'));

  //   this.action = res.data.map(o => o.average);
  // }

  getActionsgraph() {
    this.lineChartData = [
      { data: this.action, label: 'Average' },
    ]
    this.lineChartLabels = this.actionLabel;
    this.lineChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
      },
      legend: {

        display: true,
        position: 'top',
        labels: {
          fontColor: '#333',
          usePointStyle: true
        }

      }
    }
    this.lineChartColors= [
      {
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
    ];
  }
  getBehavioursgraph() {
    this.lineChartData1 = [
      { data: this.behaviour, label: 'Average' },
    ]
    this.lineChartLabels1 = this.behaviourLabel;
    this.lineChartOptions1 = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
      },
      legend: {

        display: true,
        position: 'top',
        labels: {
          fontColor: '#333',
          usePointStyle: true
        }

      }
    }
    this.lineChartColors1= [
      {
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
      {
        borderColor: '#c99d2e',
        backgroundColor: 'transparent'
      },
      {
        borderColor: '#73ceef',
        backgroundColor: 'transparent'
      },
    ];
  }
  getOutComesgraph() {
    this.lineChartData2 = [
    {data: this.outcome, label: 'Average'}
    ]
    this.lineChartLabels2 =  this.outcomeLabel;
    this.lineChartOptions2 = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          fontColor: '#333',
          usePointStyle: true
        }

      }
    }
    this.lineChartColors3= [
      {
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
      {
        borderColor: '#c99d2e',
        backgroundColor: 'transparent'
      },
      {
        borderColor: '#73ceef',
        backgroundColor: 'transparent'
      },
    ];
  }
  getReflectsgraph() {
    this.lineChartData3 = [
      { data: this.reflect, label: 'Impact of Weekly Check-in' },
    ]
    this.lineChartLabels3 = this.reflectLabel;
    this.lineChartOptions3 = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
      },
      legend: {

        display: true,
        position: 'top',
        labels: {
          fontColor: '#333',
          usePointStyle: true
        }

      }
    }
    this.lineChartColors3= [
      {
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
    ];
  }
  getEnlistsgraph() {
    this.lineChartData4 = [
      { data: this.enlist, label: 'Average of Raters' },]
    this.lineChartLabels4 =  this.enlistLabel;
    this.lineChartOptions4 = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
      },
      legend: {

        display: true,
        position: 'top',
        labels: {
          fontColor: '#333',
          usePointStyle: true
        }

      }
    }
    this.lineChartColors4= [
      {
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
     
    ];
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

