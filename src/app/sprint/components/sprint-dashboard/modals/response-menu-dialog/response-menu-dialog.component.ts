import { HttpClient } from '@angular/common/http';
import { SdMycommentsComponent } from './../sd-mycomments/sd-mycomments.component';
import { SdMyadviceComponent } from './../sd-myadvice/sd-myadvice.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-response-menu-dialog',
  templateUrl: './response-menu-dialog.component.html',
  styleUrls: ['./response-menu-dialog.component.scss']
})
export class ResponseMenuDialogComponent implements OnInit {

  constructor(private dialog: MatDialog, private http: HttpClient) { }
  ngOnInit(): void {
  }
  openAdvice() {
    const dialogRef = this.dialog.open(SdMyadviceComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      panelClass: 'custom-dialog-container'
    });
  }
  openComment() {
    const dialogRef = this.dialog.open(SdMycommentsComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      panelClass: 'custom-dialog-container'
    });
  }

}
