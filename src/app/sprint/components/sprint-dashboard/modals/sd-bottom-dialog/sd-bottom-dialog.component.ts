import { ConfigService } from './../../../../../shared/service/config.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-sd-bottom-dialog',
  templateUrl: './sd-bottom-dialog.component.html',
  styleUrls: ['./sd-bottom-dialog.component.scss'],
})
export class SdBottomDialogComponent implements OnInit {
  chartData: any[] = [];
  chartItem: any = [];
  label: any = [];
  legend: any = [];
  style: any;
  loadCounter = 0;
  hidelegend = false;
  userSprint: any;
  frequency = 0;
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
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];
  actionStyle = {
    backgroundColor: '#3D5DFF0D',
    borderColor: '#3D5DFF',
    textColor: '#3D5DFF',
  };

  behaviourStyle = {
    backgroundColor: '##FF3A290D',
    borderColor: '#FF3A29',
    textColor: '#FF3A29',
  };

  outcomeStyle = {
    backgroundColor: '#7700960D',
    borderColor: '#770096',
    textColor: '#770096',
  };

  enlistStyle = {
    backgroundColor: '#FFB50D0D',
    borderColor: '#FFB50D',
    textColor: '#FFB50D',
  };
  action: any = [];
  actionLabel: Label[];
  actionGraph: any;
  chartsData: any;
  behaviorGraph: any;
  behaviourLegend: any;
  behaviourLabel: any;
  behaviour: any;
  outcomeGraph: any;
  outcomeLegend: any;
  outcomeLabel: any;
  outcome: any;
  behaviourArray: any[];
  outComesArray: any[];
  outcomeTerm: any[];
  behaviourTerm: any[];
  constructor(
    public dialogRef: MatDialogRef<SdBottomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    switch (this.data) {
      case 'action':
        this.getActionTrendData();
        this.style = this.actionStyle;
        this.hidelegend = false;
        console.log('data' , this.data)
        break;
      case 'outcome':
        this.getOutcomeTrendData();
        this.style = this.outcomeStyle;
        break;
      case 'behaviour':
        this.getBehaviourTrendData();
        this.style = this.behaviourStyle;
        break;
      case 'enlist':
        this.getEnlistTrendData();
        this.style = this.enlistStyle;
        this.hidelegend = true;
        break;
      default:
        break;
    }
    // this.chartData = this.data.allTrendData;
  }
  getActionTrendData() {
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/usersprint/get-usersprint`).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.userSprint = res.data[0];
          this.frequency = this.userSprint.frequency;
          this.http
            .get(`${environment.baseurl}/actionweeklyscore/trend`)
            .subscribe(
              (res: any) => {
                console.log(res);
                this.loadCounter -= 1;
                // this.chartsData = res.data;
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
              (err) => {
                console.error(err);
              }
            );
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
  getOutcomeTrendData() {
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/usersprint/get-usersprint`).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.userSprint = res.data[0];
          this.frequency = this.userSprint.frequency;
          this.http
            .get(`${environment.baseurl}/outcomefeedback/trend`)
            .subscribe(
              (res: any) => {
                this.loadCounter -= 1;
                this.configService.setConfig({ isLoader: false });
                     console.log(res);
                this.outcomeGraph = res.data;
                this.outcomeLegend = res.data.map(o => {
                  return { title: o.title, description: o.description };
                });
                this.outComesArray = [];
                for (let value of this.outcomeGraph) {
                  let ratingAverage = [];
                  this.outcomeTerm = [];
                  for (let data of value.feedback) {
                    ratingAverage.push(data.ratingAvg)
                    this.outcomeTerm.push(moment(data.date).subtract(1, "days").format('DD-MMM'))
                  }
                  let obj = {
                    'data': ratingAverage,
                    'label': value.title,
                    'lineTension':0,
                  };
                  this.outComesArray.push(obj);
                 }
                this.getOutComesgraph();
              },
              (err) => {
                console.error(err);
                this.loadCounter -= 1;
              }
            );
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  getBehaviourTrendData() {
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/usersprint/get-usersprint`).subscribe(
      (res: any) => {
        if (res.data.length > 0) {
          this.userSprint = res.data[0];
          this.frequency = this.userSprint.frequency;
          this.http
            .get(`${environment.baseurl}/behaviourfeedback/trend`)
            .subscribe(
              (res: any) => {
                this.loadCounter -= 1;
                this.chartData = res.data;
                this.configService.setConfig({ isLoader: false });
                this.behaviorGraph = res.data;
                this.behaviourLegend = res.data.map(o => {
                  return { title: o.title, description: o.description };
                });
        
                    console.log('behavious label', this.behaviorGraph);
                this.behaviourArray = [];
                for (let value of this.behaviorGraph) {
                  let ratingAverage = [];
                  this.behaviourTerm = [];
                  for (let data of value.feedback) {
                    ratingAverage.push(data.ratingAvg)
                    this.behaviourTerm.push(moment(data.date).subtract(1, "days").format('DD-MMM'))
                  }
                  let obj = {
                    'data': ratingAverage,
                    'label': value.title,
                    'lineTension':0,
                  };
                  this.behaviourArray.push(obj);
                  console.log('this.behaviour' , this.behaviourArray);
                  
                }
               
                console.log('behaviour' , this.behaviourArray);
                this.getBehavioursgraph();
                  },
              (err) => {
                this.loadCounter -= 1;
                console.error(err);
              }
            );
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
  getEnlistTrendData() {
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/userfeedback/trend`).subscribe(
      (res: any) => {
        this.chartData = res.data;
        this.configService.setConfig({ isLoader: false });

        this.label = res.data.map((o) => moment(o.date).format('DD-MMM'));

        this.chartItem = [res.data.map((o) => o.avg)];
        this.legend = [];
        this.loadCounter -= 1;
      },
      (err) => {
        this.loadCounter -= 1;
        console.error(err);
      }
    );
  }
  getActionsgraph() {
    this.lineChartData = [
      { data: this.action, label: 'Activity Level', lineTension:0 },
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
            display: true,
            ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true,   // minimum value will be 0.
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
    this.lineChartLabels2 =   this.outcomeTerm;
    this.lineChartOptions2 = {
      responsive: true,
      scales: {
        yAxes: [{
            display: true,
            ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true,   // minimum value will be 0.
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
    this.lineChartColors2= [
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
}
