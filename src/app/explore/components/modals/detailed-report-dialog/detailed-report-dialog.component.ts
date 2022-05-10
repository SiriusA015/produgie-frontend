import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import _ from 'lodash';

import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-detailed-report-dialog',
  templateUrl: './detailed-report-dialog.component.html',
  styleUrls: ['./detailed-report-dialog.component.scss'],
})
export class DetailedReportDialogComponent implements OnInit {
  loadCounter = 0;
  allData: any[] = [];

  constructor(
    private http: HttpClient,
    public matdialogRef: MatDialogRef<DetailedReportDialogComponent>
  ) {}

  ngOnInit(): void {
    this.getAllDataReport();
  }

  getAllDataReport() {
    this.loadCounter += 1;
    this.http
      .get(`${environment.baseurl}/capabilityscoredata/capability-report-all`)
      .subscribe(
        (res: any) => {
          this.allData = res.data;
          /* sort this data according to capabilities type */
          this.allData.sort(function (a, b) {
            return a.id - b.id;
          });
          // this.allData = _.sortBy( this.allData, 'capability.capType');
          // this.allData.sort((a, b)=>{
          //   if(a.capability.capType > b.capability.capType) return -1;
          //   if(a.capability.capType < b.capability.capType) return 1;
          //   return 0;
          // });
          this.loadCounter -= 1;
        },
        (err) => {
          console.error(err);
          this.loadCounter -= 1;
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
    document.getElementById('printMe').style.display = 'block';
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
          filename: String(localStorage.getItem('userName')).trim() + '_report',
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { scale: 1, allowTaint: false },
          jsPDF: { unit: 'mm', format: 'a3', compress: true },
          pagebreak: { after: '.page-break' },
          enableLinks: true,
        };

        var element = document.getElementById('printMe');
        await html2pdf().set(config).from(element).save();

        document.getElementById('printMe').style.display = 'none';
        document.getElementById('download').innerHTML = 'Download';

        // try {

        // document.getElementById('download').innerHTML = 'Downloading...';

        // /* For showing svg icons */
        // var svgElements = document.querySelectorAll('svg');
        // svgElements.forEach(function(item) {
        //     item.setAttribute("width", item.getBoundingClientRect().width.toString());
        //     item.setAttribute("height", item.getBoundingClientRect().height.toString());
        //     item.style.width = null;
        //     item.style.height= null;
        // });

        // html2canvas(document.getElementById('printMe'),
        //                       {scrollY: -window.scrollY,
        //                         scale: 1
        //                       }
        //                     )
        //                     .then(function (canvas) {

        //   const username = localStorage.getItem('userName');
        //   const image = { type: 'PNG', quality: 0.98 };
        //   const margin = [0.3, 0.3];

        //   const imgWidth = 8.5;
        //   const pageHeight = 11;

        //   const innerPageWidth = imgWidth - margin[0] * 2;
        //   const innerPageHeight = pageHeight - margin[1] * 2;

        //   // Calculate the number of pages.
        //   const pxFullHeight = canvas.height;
        //   const pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
        //   const nPages = Math.ceil(pxFullHeight / pxPageHeight);

        //   // Define pageHeight separately so it can be trimmed on the final page.
        //   let newPageHeight = innerPageHeight;

        //   // Create a one-page canvas to split up the full image.
        //   const pageCanvas = document.createElement('canvas');
        //   const pageCtx = pageCanvas.getContext('2d');
        //   pageCanvas.width = canvas.width;
        //   pageCanvas.height = pxPageHeight;

        //   // Initialize the PDF.
        //   const pdf = new jsPDF('p', 'in', [8.5, 11], true);

        //   for (let page = 0; page < nPages; page++) {
        //     // Trim the final page to reduce file size.
        //     if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
        //     pageCanvas.height = pxFullHeight % pxPageHeight;
        //     newPageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
        //     }

        //     // Display the page.
        //     const w = pageCanvas.width;
        //     const h = pageCanvas.height;

        //     pageCtx.fillStyle = 'white';
        //     pageCtx.fillRect(0, 0, w, h);
        //     pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

        //     // Add the page to the PDF.
        //     if (page > 0) pdf.addPage();
        //     var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
        //     pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, newPageHeight);
        //   }
        //   pdf.save(String(username).trim() + '-report.pdf');
        //   document.getElementById('printMe').style.display = 'none';
        //   document.getElementById('download').innerHTML = 'Download';
        //   });
        /*  } catch (error) { 
          console.log(error); 
          document.getElementById('printMe').style.display = 'none';
          document.getElementById('download').innerHTML = 'Download';
        } */
      } else {
        document.getElementById('printMe').style.display = 'none';
        document.getElementById('download').innerHTML = 'Download';
      }
    } catch (error) {
      console.log(error);
      document.getElementById('printMe').style.display = 'none';
      document.getElementById('download').innerHTML = 'Download';
    }
  }
}
