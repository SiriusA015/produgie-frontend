import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-gl-report',
  templateUrl: './gl-report.component.html',
  styleUrls: ['./gl-report.component.scss']
})
export class GlReportComponent implements OnInit {
  @Input() staticData;
  @Input() uuid;
  @Input() advices = [];
  @Input() score;
  @Input() capability;
  benchmark = [];
  description = '';
  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            max: 100
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          barPercentage: 0.5,
        },
      ],
    },

    bezierCurve : false,
    animation:{
      onComplete: ()=>{
        let canvasElements = document.querySelectorAll('canvas');
        canvasElements.forEach(function (item) {
          let image = new Image();
           image.src = item.toDataURL("image/jpg");
          //  image.width = 950;
          //  image.height = 900;
          // var MAX_WIDTH = 400;
          // var MAX_HEIGHT = 100;
          // var width = image.width;
          // var height = image.height;
          // image.src = src.replace(/^data:image\/(png|jpg);base64,/, "")
          item.parentElement.appendChild(image);
          item.remove();
        });
      }
    }
    // onAnimationComplete:this.convertImage
  };

  public barChartOptionsImportance = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            max: 5
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          barPercentage: 0.5,
        },
      ],
    },
  };
  public barChartLabels: Label[] = ['Self', 'Manager', 'Peer', 'Other', 'Team'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public chartColors: Array<any> = [
    {
      // all colors in order
      backgroundColor: ['#ffffff', '#82eae8', '#82a9e8', '#868c96', '#002869'],
    },
  ];
  public chartColorsImportance: Array<any> = [
    {
      // all colors in order
      backgroundColor: ['#ffffff', '#82a9e8', '#82a9e8', '#82a9e8', '#82a9e8'],
    },
  ];

  public barChartData: ChartDataSets[] = [{ data: [], label: 'Score' }];
  public barChartDataImportance: ChartDataSets[] = [{ data: [], label: 'Score' }];
  constructor(
  ) {}
  ngOnInit(): void {
    this.benchmark = [
      this.staticData.benchmark[this.uuid].manager,
      this.staticData.benchmark[this.uuid].peer,
      this.staticData.benchmark[this.uuid].other,
      this.staticData.benchmark[this.uuid].team,
    ];

    const data = [
      this.score.selfScore,
      this.score.managerScore,
      this.score.peerScore,
      this.score.otherScore,
      this.score.teamScore,
    ];
    const dataImportance = [
      this.score.selfImportanceScore,
      this.score.managerImportanceScore,
      this.score.peerImportanceScore,
      this.score.otherImportanceScore,
      this.score.teamImportanceScore,
    ];
    this.barChartData[0]['data'] = data;

    console.log(data,"bardata");
    console.log( this.barChartData[0]['data']);
    this.barChartDataImportance[0]['data'] = dataImportance;
    this.description = this.staticData.description[this.uuid].join('. ');



  }

}
