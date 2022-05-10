import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-trend-line-chart',
  templateUrl: './trend-line-chart.component.html',
  styleUrls: ['./trend-line-chart.component.scss'],
})
export class TrendLineChartComponent
  implements OnInit, AfterViewInit, OnChanges {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>;

  @Input() data: Array<number[]> = [];
  @Input() labels: string[] = [];
  @Input() title: string;
  @Input() borderColor = '#000';
  @Input() backgroundColor = '#FFF';
  @Input() textColor = '#000';
  @Input() details: any[] = [];
  @Input() hideLegend = false;
  @Input() infoText: string;

  colors: string[] = [
    '#00C3A1',
    '#5C71E4',
    '#FF7F5C',
    '#FFB50D',
    '#FF3A29',
    '#770096',
  ];

  public lineChartData: ChartDataSets[] = [];

  @Input() public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 12,
            fontStyle: 'bold',
            fontSize: 20,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            min: 0,
            max: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = Math.round(tooltipItem.yLabel * 100) / 100;
          return label + '%';
        },
        title: function(tooltipItem, data) {
          return;
        }
      }
    }

    // tooltips: {
    //   // Disable the on-canvas tooltip
    //   enabled: false,

    //   custom(tooltipModel) {
    //     // Tooltip Element
    //     let tooltipEl = document.getElementById('chartjs-tooltip');

    //     // Create element on first render
    //     if (!tooltipEl) {
    //       tooltipEl = document.createElement('div');
    //       tooltipEl.id = 'chartjs-tooltip';
    //       tooltipEl.innerHTML = '<table></table>';
    //       document.body.appendChild(tooltipEl);
    //     }

    //     // Hide if no tooltip
    //     if (tooltipModel.opacity === 0) {
    //       tooltipEl.style.opacity = '0';
    //       return;
    //     }

    //     // Set caret Position
    //     tooltipEl.classList.remove('above', 'below', 'no-transform');
    //     if (tooltipModel.yAlign) {
    //       tooltipEl.classList.add(tooltipModel.yAlign);
    //     } else {
    //       tooltipEl.classList.add('no-transform');
    //     }

    //     function getBody(bodyItem) {
    //       return bodyItem.lines;
    //     }

    //     // Set Text
    //     if (tooltipModel.body) {
    //       const titleLines = tooltipModel.title || [];
    //       const bodyLines = tooltipModel.body.map(getBody);

    //       let innerHtml = '<thead>';

    //       titleLines.forEach((title) => {
    //         innerHtml += '<tr><th>' + title + '</th></tr>';
    //       });
    //       innerHtml += '</thead><tbody>';

    //       bodyLines.forEach((body, i) => {
    //         const colors = tooltipModel.labelColors[i];
    //         let style = 'background:' + '#FFF';
    //         style += '; border-color:' + '#FEE';
    //         style += '; border-width: 2px';
    //         const span = '<span style="' + style + '"></span>';
    //         innerHtml += '<tr><td>' + span + body + '</td></tr>';
    //       });
    //       innerHtml += '</tbody>';

    //       const tableRoot = tooltipEl.querySelector('table');
    //       tableRoot.innerHTML = innerHtml;
    //     }

    //     // `this` will be the overall tooltip
    //     const position = this._chart.canvas.getBoundingClientRect();

    //     // Display, position, and set styles for font
    //     tooltipEl.style.opacity = '1';
    //     tooltipEl.style.position = 'absolute';
    //     tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
    //     tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
    //     tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
    //     tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
    //     tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
    //     tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
    //     tooltipEl.style.pointerEvents = 'none';
    //   }
    // }
  };

  public lineChartColors: Color[] = this.colors.map((o) => {
    return {
      borderWidth: 2,
      borderColor: o,
      pointBorderWidth: 3,
      backgroundColor: 'white',
    };
  });
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private breakpointObserver: BreakpointObserver) {
}

ngOnInit() { }

ngOnChanges() {
  console.log(this.details);
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

ngAfterViewInit() {
  this.canvas.nativeElement.style.width =
    this.wrapper.nativeElement.clientWidth + 'px';
    this.isHandset$.subscribe(
      val => {
        if (val) {
          this.canvas.nativeElement.style.height = 200 + 'px';
        } else {
          this.canvas.nativeElement.style.height = 380 + 'px';
        }
      }
    )
  // this.canvas.nativeElement.style.height = '200px';
  // this.canvas.nativeElement.style.height = this.wrapper.nativeElement.clientHeight + 'px';
}

onResize() {
  // this.wrapper.nativeElement.style.height = this.wrapper.nativeElement.offsetWidth + 'px';
  // console.log(this.wrapper.nativeElement.clientHeight);

  if (this.wrapper.nativeElement.clientWidth > 0) {
    this.canvas.nativeElement.style.width =
      this.wrapper.nativeElement.clientWidth + 'px';
  }
  if (this.wrapper.nativeElement.clientHeight > 0) {
    this.isHandset$.subscribe(
      val => {
        if (val) {
          this.canvas.nativeElement.style.height = 200 + 'px';
        } else {
          this.canvas.nativeElement.style.height = 380 + 'px';
        }
      }
    )
    // this.canvas.nativeElement.style.height = 380 + 'px';
    // this.canvas.nativeElement.style.height = this.wrapper.nativeElement.clientHeight + 'px';
  }
}
}
