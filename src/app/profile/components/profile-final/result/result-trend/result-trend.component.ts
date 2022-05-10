import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/shared/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

const trendUrl = environment.baseurl;

// const trendUrl = "https://apitest.produgie.com/leads";
// https://apitest.produgie.com/leads/userfeedback/profile-trend/283
@Component({
  selector: 'app-result-trend',
  templateUrl: './result-trend.component.html',
  styleUrls: ['./result-trend.component.scss']
})
export class ResultTrendComponent implements OnInit, OnChanges {

  @Input() selectedValue: string = "";

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
  behaviourArray: any;
  outComesArray: any;
  outComeTerm: any[];
  behaviourTerm: any;
  sprintDay: number;
  assessmentId: number;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.assessmentId = 283;

    Promise.all([
      this.getEnlistTrendData(),
      this.getBehaviourTrendData(),
      this.getOutcomeTrendData(),
      this.getReflectTrendData(),
      this.getActionTrendData()
    ]).then((values) => {
    });
  }

  ngOnChanges() {
    setTimeout(() => {
      // console.log('this is tempAdvice', this.selectedValue)
    }, 1000);
  }
  getOutcomeTrendData() {
    this.http.get(`${trendUrl}/outcomefeedback/profile-trend/${this.assessmentId}`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.outcomeGraph = res.data;
        if (this.outcomeGraph.length == 0){
          return
        }
        this.outcomeLegend = this.outcomeGraph.map(o => {
          return { title: o.title, description: o.description };
        });

        console.log('this is outComesArray', this.outcomeLegend);
        let value = this.outcomeGraph[0]
        let ratingAverage = [];
        this.outComeTerm = [];

        for (let data of value.feedback) {
          ratingAverage.push(data.ratingAvg);
          this.outComeTerm.push(moment(data.date).subtract(1, "days").format('DD-MMM'));
        }
        let obj = {
          'data': ratingAverage,
          'label': value.title
        };
        this.outComesArray = obj;
        this.getOutComesgraph();
      },
      err => {
        console.error(err);
      }
    );
  }

  getBehaviourTrendData() {
    this.http.get(`${trendUrl}/behaviourfeedback/profile-trend/${this.assessmentId}`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.behaviorGraph = res.data;

        if (this.behaviorGraph.length == 0){
          return
        }
        this.behaviourLegend = this.behaviorGraph.map(o => {
          return { title: o.title, description: o.description };
        });

          let value = this.behaviorGraph[0]
          console.log('this is this.behaviorGraph', value)
          let ratingAverage = [];
          this.behaviourTerm =[];
          for (let data of value.feedback) {
            ratingAverage.push(data.ratingAvg)
            this.behaviourTerm.push(moment(data.date).subtract(1, "days").format('DD-MMM'));
          }
          let obj = {
            'data': ratingAverage,
            'label': value.title
          };
          this.behaviourArray = obj ;
          this.getBehavioursgraph();
      },
      err => {
        console.error(err);
      }
    );
  }

  getReflectTrendData() {
    this.http.get(`${trendUrl}/weeklycheckinscore/profile-trend/${this.assessmentId}`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.reflectGraph = res.data;
        if (this.reflectGraph.length == 0){
          return
        }
        // this.reflectLabel = res.data.map(o => o.term);
        this.reflectLabel = this.reflectGraph.map(o => moment(o.date).format('DD-MMM'));

        this.reflect = this.reflectGraph.map(o => o.avg);
        this.getReflectsgraph();


      err => {
        console.error(err);
      }
      });
  }

  getEnlistTrendData() {
    this.http.get(`${trendUrl}/userfeedback/profile-trend/${this.assessmentId}`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        console.log('this si getEnlistTrendData', res)
        this.enlistGraph = res.data;

        if (this.enlistGraph.length == 0){
          return
        }
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
    this.http.get(`${trendUrl}/actionweeklyscore/profile-trend/${this.assessmentId}`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.actionGraph = res.data;
        if (this.actionGraph.length == 0){
          return
        }
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
        console.error(err);
      }
    );
  }

  getActionsgraph() {
    this.lineChartData = [
      { data: this.action, label: 'Average', lineTension: 0 },
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
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
    ];
  }
  getBehavioursgraph() {
    this.lineChartData1 = [{
        ...this.behaviourArray, lineTension: 0
      }
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
    console.log('this is outComesArray', this.outComesArray);
    this.lineChartData2 = [{
      ...this.outComesArray, lineTension: 0
    }]
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
      { data: this.reflect, label: 'Impact of Weekly Check-in', lineTension: 0 },
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
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },
    ];
  }
  getEnlistsgraph() {
    this.lineChartData4 = [
      { data: this.enlist, label: 'Average of Raters' , lineTension: 0 },
    ]
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
        borderColor: '#675ad4',
        backgroundColor: 'transparent'
      },

    ];
  }
}
