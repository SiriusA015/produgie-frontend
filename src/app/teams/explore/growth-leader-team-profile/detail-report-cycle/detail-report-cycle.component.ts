import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExploreService } from '../../explore.service';
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-detail-report-cycle',
  templateUrl: './detail-report-cycle.component.html',
  styleUrls: ['./detail-report-cycle.component.scss']
})
export class DetailReportCycleComponent implements OnInit {

  loadCounter: number;
  team_id = localStorage.getItem('selectedTeamId') || null;
  isLoading: boolean = false;
  detailReportData: [] = [];
  teamName: string;
  teamRole: any;
  roleDescription: any;
  performanceB: any;
  performanceW: any;

  constructor(
    private exploreSerice: ExploreService,
    public matdialogRef: MatDialogRef<DetailReportCycleComponent>
  ) { }

  ngOnInit(): void {
    this.getDetailReportCycle();
    this.team_id = localStorage.getItem('selectedTeamId');
  }

  getDetailReportCycle() {
    this.isLoading = true;
    this.exploreSerice.viewDetailsReportForCycleView().subscribe(
      (res: any) => {
        const cycleArr = res.map(cycleValue => {
          const bestArr = cycleValue.roleDescription.filter(o => o.performance == "Best");
          const worstArr = cycleValue.roleDescription.filter(o => o.performance == "Worst");
          return {
            bestArr: bestArr,
            worstArr: worstArr,
            percentage:bestArr[0]?.rolePercentage,
            ...cycleValue
          };
        })
        this.detailReportData = cycleArr;
        console.log(this.detailReportData,"etailReportata");
        
        this.isLoading = false;
      },
      (err) => {
        console.error(err);
        this.isLoading = false;
      }
    );
  }

  onCancel() {
    this.matdialogRef.close();
  }

  /**
  * Downloads PDF file from HTML
  */
  async onReportDownload(isReportDownload) {

    try {
      if (isReportDownload) {
        /* For placing svg icons */
        let svgElements = document.querySelectorAll('svg');
        svgElements.forEach(function (item) {
          item.setAttribute(
            'width',
            item.getBoundingClientRect().width.toString()
          );
          item.setAttribute(
            'height',
            item.getBoundingClientRect().height.toString()
          );
          item.style.width = null;
          item.style.height = null;
        });

        let config = {
          margin: [20, 0],
          filename: String(document.getElementById('selected-team').textContent) + '_report',
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { scale: 1, allowTaint: false },
          jsPDF: { unit: 'mm', format: 'a3', compress: true },
          pagebreak: { after: '.page-break' },
          enableLinks: true,
        };

        var element = document.getElementById('printMe');
        await html2pdf().set(config).from(element).save();

        document.getElementById('download').innerHTML = 'Download';

      }
    } catch (error) {
      console.log(error);
      document.getElementById('download').innerHTML = 'Download';
    }
  }


}
