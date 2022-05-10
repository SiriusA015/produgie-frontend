import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-updated-charts',
  templateUrl: './updated-charts.component.html',
  styleUrls: ['./updated-charts.component.scss']
})
export class UpdatedChartsComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [63, 35], label: 'Onboard', yAxisID: 'y-axis-1' },
    { data: [20, 50, 35], label: 'Great Feedback', yAxisID: 'y-axis-1' },
    { data: [], label: 'Define Standards', yAxisID: 'y-axis-1' }
    // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Define Standards'}
  ];
  public lineChartLabels: Label[] = ['06 Mar', '07 Mar', '08 Mar'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255, 99, 132)'
      },
      fullWidth: false
    }
    ,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: '#68cdcd',
          },
          ticks: {
            // fontColor: 'red',
            suggestedMax:100

          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: '#68cdcd',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: '#68cdcd',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      // backgroundColor: '#fff',
      borderColor: '#9564e5',
      // pointBackgroundColor: '#9564e5',
      pointBorderColor: '#9564e5',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: '#9564e5'
    },
    { // dark grey
      // backgroundColor: '#fff',
      borderColor: '#e5be58',
      // pointBackgroundColor: '#e5be58',
      pointBorderColor: '#e5be58',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: '#e5be58'
    },
    { // red
      // backgroundColor: '#fff',
      borderColor: '#68cdcd',
      // pointBackgroundColor: '#68cdcd',
      pointBorderColor: '#68cdcd',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: '#68cdcd'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  data;
  labels
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {

    this.lineChartData = this.data.map((o) => {
      return {
        data: o,
        label: '',
        lineTension: 0,
        fill: false,
        showLine: true,
        pointRadius: 14,
      };
    });
    this.lineChartLabels = this.labels;
    if (this.labels.length <= 8) {
      this.lineChartOptions.scales.xAxes[0].ticks.fontSize = 20;
    }
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor(): void {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = ``;

  }

  public changeLabel(): void {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
  }
}