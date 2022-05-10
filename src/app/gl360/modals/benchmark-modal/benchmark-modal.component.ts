import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-benchmark-modal',
  templateUrl: './benchmark-modal.component.html',
  styleUrls: ['./benchmark-modal.component.scss'],
})
export class BenchmarkModalComponent implements OnInit {
  benchmark = [];
  advices = [];
  description = '';
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            max: 100,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
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
            max: 5,
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
  public barChartDataImportance: ChartDataSets[] = [
    { data: [], label: 'Score' },
  ];

  loadCounter = 0;
  constructor(
    public dialogRef: MatDialogRef<BenchmarkModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.getReport(this.data.uuid);
  }
  getReport(uuid) {
    this.loadCounter += 1;
    this.http
      .get(
        `${environment.baseurl}/nomineeresponsescore/capability-report/${uuid}`
      )
      .subscribe(
        (res: any) => {
          this.benchmark = [
            res.data.staticData.benchmark[this.data.uuid].manager,
            res.data.staticData.benchmark[this.data.uuid].peer,
            res.data.staticData.benchmark[this.data.uuid].other,
            res.data.staticData.benchmark[this.data.uuid].team,
          ];

          const data = [
            res.data.score.selfScore,
            res.data.score.managerScore,
            res.data.score.peerScore,
            res.data.score.otherScore,
            res.data.score.teamScore,
          ];
          const dataImportance = [
            res.data.score.selfImportanceScore,
            res.data.score.managerImportanceScore,
            res.data.score.peerImportanceScore,
            res.data.score.otherImportanceScore,
            res.data.score.teamImportanceScore,
          ];
          this.barChartData[0]['data'] = data;
          this.barChartDataImportance[0]['data'] = dataImportance;
          this.advices = res.data.advice;
          this.description = res.data.staticData.description[
            this.data.uuid
          ].join('. ');
          this.loadCounter -= 1;
        },
        (err) => {
          console.log(err);
          this.loadCounter -= 1;
        }
      );
  }
}
