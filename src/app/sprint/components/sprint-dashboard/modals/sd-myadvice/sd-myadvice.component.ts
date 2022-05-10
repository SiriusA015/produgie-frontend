import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sd-myadvice',
  templateUrl: './sd-myadvice.component.html',
  styleUrls: ['./sd-myadvice.component.scss']
})
export class SdMyadviceComponent implements OnInit {
  isLoading = true;
  advice = [];
  constructor(public dialogRef: MatDialogRef<SdMyadviceComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.getAdviceFeedback();
  }
  getAdviceFeedback(){
    this.http.get(`${environment.baseurl}/development/get-af`).subscribe(
      (res: any) => {
        console.log(res.data.advice);
        this.advice = res.data.advice;
        this.isLoading = false;
      },
      err => {
        console.error(err);
        this.isLoading = false;
      }
    );
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
