import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wc-review-dialog',
  templateUrl: './wc-review-dialog.component.html',
  styleUrls: ['./wc-review-dialog.component.scss'],
})
export class WcReviewDialogComponent implements OnInit {
  loadCounter = 0;
  date = new Date();
  isLoading: boolean;
  readNotification: any;
  notificationService: any;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<WcReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  options = [
    { label: 'What weekly Check-in?', value: 1 },
    { label: 'Didn\'t do it-but thought about doing it', value: 2 },
    { label: 'Kind of did it - but was not very useful', value: 3 },
    { label: 'Did it and progressed my Sprint', value: 4 },
    {
      label: 'Was really helpful - progressed my Sprint and Insight',
      value: 5,
    },
  ];
  selectedOption;

  ngOnInit(): void {
  }

  onSelect(option) {
    this.selectedOption = option;
  }

  onSubmit() {
    if (this.selectedOption) {
      this.loadCounter += 1;
      const payload = {
        date: this.data.createdAt,
        score: this.selectedOption.value,
      };
      this.http.post(`${environment.baseurl}/weeklycheckinscore/feedback`, payload).subscribe(
        (res: any) => {
          this.loadCounter -= 1;
          this.dialogRef.close({isCancel: false, unreadId: this.data.id});
          // window.location.reload();
        },
        err => {
          console.error(err);
          this.loadCounter -= 1;
        }
      );
    }
  }
  onClose() {
    this.dialogRef.close({isCancel: true});
  }
}
