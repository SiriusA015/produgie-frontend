import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExploreService } from '../../explore.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-detail-report-gla',
  templateUrl: './detail-report-gla.component.html',
  styleUrls: ['./detail-report-gla.component.scss']
})
export class DetailReportGlaComponent implements OnInit {

  loadCounter: number;
  team_id = localStorage.getItem('selectedTeamId') || null;
  isLoading: boolean = false;
  detailReportData: [] = [];
  teamName: string;
  newarr: any;

  constructor(
    private exploreSerice: ExploreService,
    public matdialogRef: MatDialogRef<DetailReportGlaComponent>
  ) { }

  ngOnInit(): void {
    this.getDetailReportGla();
    this.team_id = localStorage.getItem('selectedTeamId');
  }

  getDetailReportGla() {
    this.isLoading = true;
    this.exploreSerice.getDetailReportGla().subscribe(
      (res: any) => {
        if (res) {
          this.detailReportData = res;
        }
        this.isLoading = false;
      },
      (err) => {
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
      document.getElementById('download').innerHTML = 'Download';
    }
  }

}