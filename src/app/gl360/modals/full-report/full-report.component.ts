import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-full-report',
  templateUrl: './full-report.component.html',
  styleUrls: ['./full-report.component.scss'],
})
export class FullReportComponent implements OnInit {
  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FullReportComponent>
  ) {}
  capabilities = [];
  staticData: any = {};
  score: any = {};
  advice: any = {};
  loadCounter = 0;
  ngOnInit(): void {
    this.getReport();
  }

  getReport() {
    this.loadCounter += 1;
    this.http
      .get(`${environment.baseurl}/nomineeresponsescore/capability-report`)
      .subscribe(
        (res: any) => {
          this.capabilities = res.data.capability;
          this.staticData = res.data.staticData;
          this.score = res.data.score;
          this.advice = res.data.advice;
          this.loadCounter -= 1;
        },
        (err) => {
          console.log(err);
          this.loadCounter -= 1;
        }
      );
  }
  onClose() {
    this.dialogRef.close();
  }

  async onReportDownload(isReportDownload) {
    // document.getElementById('printMe').style.display = 'block';
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
          margin: [20, 10],
          filename: String(localStorage.getItem('userName')).trim() + '_report',
          image: { type: 'jpg', quality: 1 },
          html2canvas: { scale: 1, allowTaint: false },
          jsPDF: { unit: 'mm', format: 'a3', compress: true },
          pagebreak: { mode: 'css' },
          enableLinks: true,
        };

        var element = document.getElementById('printMe');
        await html2pdf().set(config).from(element).save();

        // document.getElementById('printMe').style.display = 'none';
        document.getElementById('download').innerHTML = 'Download';
      } else {
        // document.getElementById('printMe').style.display = 'none';
        document.getElementById('download').innerHTML = 'Download';
      }
    } catch (error) {
      console.log(error);
      // document.getElementById('printMe').style.display = 'none';
      document.getElementById('download').innerHTML = 'Download';
    }
  }

  // async onReportDownload(isReportDownload) {
  //   try {
  //     if (isReportDownload) {

  //       document.getElementById('pdfstyle');
  //       let PDFDATA = document.getElementById('pdfdata');
  //      let PRINTDATA = document.getElementById('printMe');
  //       let svgElements = document.querySelectorAll('svg');
  //       svgElements.forEach(function (item) {
  //         item.setAttribute("width", item.getBoundingClientRect().width.toString());
  //         item.setAttribute("height", item.getBoundingClientRect().height.toString());
  //         item.style.width = null;
  //         item.style.height = null;
  //       });

  //       var HTML_Width = 290;
  //       var HTML_Height = 0;
  //       var top_left_margin = 8;
  //       var PDF_Width = Number(HTML_Width + (top_left_margin * 2));
  //       var PDF_Height = (PDF_Width * 2) + (top_left_margin * 2);
  //       var canvas_image_width = Number(HTML_Width);
  //       var canvas_image_height = Number(HTML_Height);

  //       var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

  //       console.log(totalPDFPages,"pdfpages");
  //       html2canvas(PDFDATA,PRINTDATA).then(function (canvas) {
  //         canvas.getContext('2d');

  //         console.log(canvas.height + "  " + canvas.width);

  //         var imgData = canvas.toDataURL("image/jpeg", 1.0);
  //         let PDF = new jsPDF('p', 'mm', 'a3',);
  //         let position = 0;
  //         PDF.addImage(imgData, 'PNG', 0, position, canvas_image_width, canvas_image_height)

  //         for (var i = 1; i <= 4; i++) {
  //          PDF.addPage('a3', 'p');
  //           PDF.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
  //         }

  //         PDF.output('dataurlnewwindow');
  //       document.getElementById('pdfstyle').style.marginTop = '0px';

  //       });

  //       // html2canvas(DATA).then(canvas => {

  //       //   let fileWidth = 208;
  //       //   let fileHeight = canvas.height * fileWidth / canvas.width;

  //       //   const FILEURI = canvas.toDataURL('image/png')
  //       //   let PDF = new jsPDF('p', 'mm', 'a3',);
  //       //   // PDF: { unit: 'mm', format: 'a3', compress: true, removeContainer: false },
  //       //   let position = 0;
  //       //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

  //       //   PDF.save('angular-demo.pdf');
  //       // });
  //       /* For placing svg icons */
  //       // let svgElements = document.querySelectorAll('svg');
  //       // svgElements.forEach(function (item) {
  //       //   item.setAttribute("width", item.getBoundingClientRect().width.toString());
  //       //   item.setAttribute("height", item.getBoundingClientRect().height.toString());
  //       //   item.style.width = null;
  //       //   item.style.height = null;
  //       // });

  //       // // let imageElements = document.querySelectorAll('img');
  //       // // imageElements.forEach(function (item) {
  //       // //   item.setAttribute("width", item.getBoundingClientRect().width.toString());
  //       // //   item.setAttribute("height", item.getBoundingClientRect().height.toString());
  //       // //   item.style.width = null;
  //       // //   item.style.height = null;
  //       // // });

  //       // //  var canvas = document.getElementById("mycanvas");

  //       // let config = {
  //       //   margin: [20, 0],
  //       //   filename: String(localStorage.getItem('userName')).trim() + '_report',
  //       //   image: { type: 'svg', quality: 1, },
  //       //   html2canvas: { scale: 1, allowTaint: true },
  //       //   jsPDF: { unit: 'mm', format: 'a3', compress: true, removeContainer: false },
  //       //   pagebreak: { after: '.page-break' },
  //       //   enableLinks: true,
  //       //   crossOrigin: 'anonymous',
  //       //   preserveDrawingBuffer: true,
  //       //   useCORS: true
  //       // };

  //       // var element = document.getElementById('printMe');
  //       // await html2pdf().set(config).from(element).save();
  //       // // await html2pdf().from(element).save();

  //       document.getElementById('printMe').style.display = 'none';
  //       document.getElementById('download').innerHTML = 'Download';
  //     }
  //     else {
  //       document.getElementById('printMe').style.display = 'none';
  //       document.getElementById('download').innerHTML = 'Download';
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     document.getElementById('printMe').style.display = 'none';
  //     document.getElementById('download').innerHTML = 'Download';
  //   }
  // }

  //  convertCanvasToImage() {
  //   let canvas = document.getElementById("canvas");
  //   let image = new Image();
  //   image.src = canvas.toDataURL();
  //   return image;
  // }
}
