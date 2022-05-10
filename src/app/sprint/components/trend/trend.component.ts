import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../app/shared/utils/utils.service';
import { environment } from '../../../../../src/environments/environment';
import { ConfigService } from './../../../shared/service/config.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit {

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
  sprintDay: number;

  constructor(private http: HttpClient, private configService: ConfigService, private router: Router) { }

  ngOnInit(): void {
    this.getUserSprint();
    this.getBehaviourTrendData();
    this.getOutcomeTrendData();
    this.getReflectTrendData();
    this.getEnlistTrendData();
  }
  getUserSprint() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${environment.baseurl}/usersprint/get-usersprint`).subscribe(
      (res: any) => {

        if (res.data.length > 0) {
          this.userSprint = res.data[0];
          this.isStop = this.userSprint.isStop;
          this.frequency = this.userSprint.frequency;
          const sprintdifference = UtilsService.calculateSecDiffFromUTCnonAbs(this.userSprint.datetimeFrom, new Date().toISOString());
          if (sprintdifference <= 0) {
            this.configService.setConfig({ isLoader: false });
            // this.router.navigate(['/sprint/not-started']);
            this.sprintDay = 0;
          } else {
            this.getActionTrendData();
            this.getBehaviourTrendData();
            this.getOutcomeTrendData();
            this.getReflectTrendData();
            this.getEnlistTrendData();
          }
        } else {
          this.configService.setConfig({ isLoader: false });
        }
      },
      (err) => {
        this.configService.setConfig({ isLoader: false });
        console.error(err);
      }
    );
    // this.userSprint = true;
  }
  getOutcomeTrendData() {
    this.http.get(`${environment.baseurl}/outcomefeedback/trend`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
         this.outcomeGraph = res.data;
        this.outcomeLegend = res.data.map(o => {
          return { title: o.title, description: o.description };
        });
        this.outComesArray = [];
        for (let value of this.outcomeGraph) {
          let ratingAverage = [];
          this.outComeTerm = [];
          for (let data of value.feedback) {
            ratingAverage.push(data.ratingAvg);
            this.outComeTerm.push(moment(data.date).subtract(1, "days").format('DD-MMM'));
          }
          let obj = {
            'data': ratingAverage,
            'label': value.title,
            'lineTension':0
          };
          this.outComesArray.push(obj);

        }
           this.getOutComesgraph();
      },
      err => {
        console.error(err);
      }
    );
  }


  getBehaviourTrendData() {
    this.http.get(`${environment.baseurl}/behaviourfeedback/trend`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.behaviorGraph = res.data;
        this.behaviourLegend = res.data.map(o => {
          return { title: o.title, description: o.description };
        });

              this.behaviourArray = [];
        for (let value of this.behaviorGraph) {
          let ratingAverage = [];
          this.behaviourTerm =[];
          for (let data of value.feedback) {
            ratingAverage.push(data.ratingAvg)
            this.behaviourTerm.push(moment(data.date).subtract(1, "days").format('DD-MMM'));
          }
          let obj = {
            'data': ratingAverage,
            'label': value.title,
            'lineTension':0
          };
          this.behaviourArray.push(obj);

        }

       this.getBehavioursgraph();
      },
      err => {
        console.error(err);
      }
    );
  }

  getReflectTrendData() {
    this.http.get(`${environment.baseurl}/weeklycheckinscore/trend`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.reflectGraph = res.data;
        // this.reflectLabel = res.data.map(o => o.term);
        this.reflectLabel = res.data.map(o => moment(o.date).format('DD-MMM'));

        this.reflect = res.data.map(o => o.avg);
        this.getReflectsgraph();


      err => {
        console.error(err);
      }
      });
  }

  getEnlistTrendData() {
    this.http.get(`${environment.baseurl}/userfeedback/trend`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.enlistGraph = res.data;
        this.enlistGraph.sort((a,b) => (a.date > b.date) ? 1 : ((b.date> a.date) ? -1 : 0));
        // this.enlistLabel = res.data.map(o => o.term);
        this.enlistLabel =this.enlistGraph.map(o => moment(o.date).format('DD-MMM'));

        this.enlist = this.enlistGraph.map(o => o.avg);
        this.getEnlistsgraph();


      err => {
        console.error(err);
      }
    })

  }

  getActionTrendData() {
    this.http.get(`${environment.baseurl}/actionweeklyscore/trend`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.actionGraph = res.data;
        this.actionGraph.sort((a,b) => (a.date > b.date) ? 1 : ((b.date> a.date) ? -1 : 0));

        // this.actionLabel = res.data.map(o => 'T' + o.term);
        this.actionLabel = this.actionGraph.map(o => moment(o.date).subtract(1, "days").format('DD-MMM'));
        this.actionLabel=  this.actionLabel.filter( function( item, index, inputArray ) {
          return inputArray.indexOf(item) == index;
   });
        this.action = this.actionGraph.map(o => o.average);
        this.getActionsgraph();

      },
      err => {
        this.setData()
        console.error(err);
      }
    );
  }
  setData() {
    let res = {
      "success": true,
      "status": 200,
      "data": [
        {
          "id": 32,
          "assessmentId": 122,
          "date": "2021-02-18T18:30:00.00Z",
          "totalAction": 1,
          "totalFinished": 0,
          "allStartedAction": 0,
          "actionNotStarted": 1,
          "notFinishedAction": 0,
          "actionWithNoActivity": 0,
          "actionWithOneActivity": 0,
          "actionWithTwoActivity": 0,
          "score": 4,
          "total": 4,
          "average": 0,
          "term": 1,
          "createdAt": "2021-02-18T18:59:58.00Z",
          "updatedAt": "2021-02-18T18:59:58.00Z"
        },
        {
          "id": 44,
          "assessmentId": 122,
          "date": "2021-02-25T18:30:00.00Z",
          "totalAction": 1,
          "totalFinished": 0,
          "allStartedAction": 0,
          "actionNotStarted": 1,
          "notFinishedAction": 0,
          "actionWithNoActivity": 0,
          "actionWithOneActivity": 0,
          "actionWithTwoActivity": 0,
          "score": 0,
          "total": 4,
          "average": 0,
          "term": 2,
          "createdAt": "2021-02-25T18:30:04.00Z",
          "updatedAt": "2021-02-25T18:30:04.00Z"
        },
        {
          "id": 57,
          "assessmentId": 122,
          "date": "2021-03-04T18:30:00.00Z",
          "totalAction": 1,
          "totalFinished": 3,
          "allStartedAction": 4,
          "actionNotStarted": 1,
          "notFinishedAction": 0,
          "actionWithNoActivity": 0,
          "actionWithOneActivity": 0,
          "actionWithTwoActivity": 0,
          "score": 10,
          "total": 4,
          "average": 2,
          "term": 3,
          "createdAt": "2021-03-04T18:30:11.00Z",
          "updatedAt": "2021-03-04T18:30:11.00Z"
        }
      ]
    }
    this.configService.setConfig({ isLoader: false });

    // this.actionLabel = res.data.map(o => 'T' + o.term);
    this.actionLabel = res.data.map(o => moment(o.date).format('DD-MMM'));

    this.action = res.data.map(o => o.average);

    }

  getActionsgraph() {
    this.lineChartData = [
      { data: this.action, label: 'Activity Level',lineTension:0 },
    ]
    this.lineChartLabels = this.actionLabel;
    this.lineChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                suggestedMax:100

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
        pointBackgroundColor : '#675ad4',
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
    ];
  }
  getBehavioursgraph() {
    this.lineChartData1 = [
     ...this.behaviourArray
    ]

    this.lineChartLabels1 = this.behaviourTerm;

    this.lineChartOptions1 = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                suggestedMax:100
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
        pointBackgroundColor : '#675ad4',
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
      {
        pointBackgroundColor : '#c99d2e',
        borderColor: '#c99d2e',
        backgroundColor: 'transparent'
      },
      {
        pointBackgroundColor : '#73ceef',
        borderColor: '#73ceef',
        backgroundColor: 'transparent'
      },
    ];

  }
  getOutComesgraph() {
    this.lineChartData2 = [
      ...this.outComesArray
    ]
    this.lineChartLabels2 =  this.outComeTerm;
    this.lineChartOptions2 = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                suggestedMax:100
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
        pointBackgroundColor : '#675ad4',
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
      {
        pointBackgroundColor : '#c99d2e',
        borderColor: '#c99d2e',
        backgroundColor: 'transparent'
      },
      {
        pointBackgroundColor : '#73ceef',
        borderColor: '#73ceef',
        backgroundColor: 'transparent'
      },
    ];
  }
  getReflectsgraph() {
    this.lineChartData3 = [
      { data: this.reflect, label: 'Impact of Weekly Check-in','lineTension':0 },
    ]
    this.lineChartLabels3 = this.reflectLabel;
    this.lineChartOptions3 = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                suggestedMax:100
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
        pointBackgroundColor : '#675ad4',
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
    ];
  }
  getEnlistsgraph() {
    this.lineChartData4 = [
      { data: this.enlist, label: '% Sprint Crew Responding','lineTension':0 },]
    this.lineChartLabels4 =  this.enlistLabel;
    this.lineChartOptions4 = {
      responsive: true,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                suggestedMax:100
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
        pointBackgroundColor : '#675ad4',
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },

    ];
  }
}
