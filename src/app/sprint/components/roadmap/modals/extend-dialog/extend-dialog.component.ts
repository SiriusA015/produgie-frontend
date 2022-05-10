import { environment } from './../../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-extend-dialog',
  templateUrl: './extend-dialog.component.html',
  styleUrls: ['./extend-dialog.component.scss'],
})
export class ExtendDialogComponent implements OnInit {
  isLoading = false;
  constructor(
    public dialogRef: MatDialogRef<ExtendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}
  sprintExtendRange = [1, 2];
  selectedExtendWeek;

  ngOnInit(): void {}
  selectRange(week) {
    this.isLoading = true;
    this.selectedExtendWeek = week;
    this.http.post(`${environment.baseurl}/actionactivity/extend-sprint`, {week}).subscribe(
      (res: any) => {
        this.dialogRef.close({isCancel: false, added: true});
      },
      err => {
        console.error(err);
        this.dialogRef.close({isCancel: false, added: false});
      }
    );
  }
  onClose() {
    this.dialogRef.close({isCancel: true, added: false});
  }
}
