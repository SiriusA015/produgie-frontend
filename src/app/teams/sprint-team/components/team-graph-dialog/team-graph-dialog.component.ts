import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SprintServiceService } from '../../sprint-service.service';
@Component({
  selector: 'app-team-graph-dialog',
  templateUrl: './team-graph-dialog.component.html',
  styleUrls: ['./team-graph-dialog.component.scss']
})
export class TeamGraphDialogComponent implements OnInit {
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
  teamSprintId: string;
  lineChartLegend: boolean;
    constructor(
      public dialogRef: MatDialogRef<TeamGraphDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private sprintService: SprintServiceService 
    ) {}
  
    ngOnInit(): void {
      this.teamSprintId = localStorage.getItem('sprint_Id');
      this.lineChartLegend = true;
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
      this.sprintService.getActionGraph(this.teamSprintId).subscribe(
        (res: any) => {
          console.log('res',res);
          this.loadCounter -= 1;
          this.actionGraph = res;
          this.actionGraph.sort((a,b) => (a.actionDate > b.actionDate) ? 1 : ((b.actionDate> a.actionDate) ? -1 : 0));
          console.log('action' , this.actionGraph);
          
          // this.actionLabel = res.data.map(o => 'T' + o.term);
          this.actionLabel = this.actionGraph.map(o => moment(o.actionDate).format('DD-MMM'));
          this.actionLabel=  this.actionLabel.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
     });
          this.action = this.actionGraph.map(o => o.percentage);
          this.getActionsgraph();
          console.log('action',this.action);
  
        },
        err => {
          this.actionGraph =[];
          this.loadCounter -= 1;
          console.error(err);
        }
      );
    }
    getOutcomeTrendData() {
      this.loadCounter += 1;
      this.sprintService.getOutcomeGraph(this.teamSprintId).subscribe(
        (res: any) => {
          console.log(res);
          this.loadCounter -= 1;
          this.outcomeGraph = res;
          console.log('outcomes' , this.outcomeGraph)
          this.outcomeGraph.sort((a,b) => (a.feedbackTermDate > b.feedbackTermDate) ? 1 : ((b.feedbackTermDate> a.feedbackTermDate) ? -1 : 0));
          this.outcomeLabel = this.outcomeGraph.map(o => moment(o.feedbackTermDate).format('DD-MMM'));
          this.outcomeLabel=  this.outcomeLabel.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
     });
          this.outcome = this.outcomeGraph.map(o => o.percentage);
          this.getOutComesgraph();
        },
        err => {
          this.loadCounter -= 1;
          console.error(err);
        }
      );
    }
  
    getBehaviourTrendData() {
      this.loadCounter += 1;
      this.sprintService.getBehaviourGraph(this.teamSprintId).subscribe(
        (res: any) => {
          console.log('res behavior',res);
          this.loadCounter -= 1;
          this.behaviorGraph = res;
          this.behaviorGraph.sort((a,b) => (a.feedbackDate > b.feedbackDate) ? 1 : ((b.feedbackDate> a.feedbackDate) ? -1 : 0)); 
          this.behaviourLabel = this.behaviorGraph.map(o => moment(o.feedbackDate).format('DD-MMM'));
          this.behaviourLabel=  this.behaviourLabel.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
     });
          this.behaviour = this.behaviorGraph.map(o => o.percentage);
        
          this.getBehavioursgraph();
        },
        err => {
          this.loadCounter -= 1;
          console.error(err);
        }
      );
    }
    getEnlistTrendData() {
      this.loadCounter += 1;
      this.sprintService.getEnlistGraph(this.teamSprintId).subscribe(
        (res: any) => {
          this.chartData = res;
          this.loadCounter -= 1;
  
          this.label = res.map((o) => moment(o.termDate).format('DD-MMM'));
  
          this.chartItem = [res.map((o) => o.percentage)];
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
        { data: this.action, label: 'Average' },
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
      this.lineChartData1 = [
        { data: this.behaviour, label: 'Average' },
      ]
      this.lineChartLabels1 = this.behaviourLabel;
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
        { data: this.outcome, label: 'Average' },
      ]
      this.lineChartLabels2 =   this.outcomeLabel;
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
  }
  


