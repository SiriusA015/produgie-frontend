import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FocusAreaDetailsComponent } from 'src/app/explore/components/my-snapshot/modals/focus-area-details/focus-area-details.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fad-details',
  templateUrl: './fad-details.component.html',
  styleUrls: ['./fad-details.component.scss']
})
export class FadDetailsComponent implements OnInit {
  strategy: any;
  style: any;
  score = [1, 2, 3, 4, 5];
  loadCounter = 0;
  constructor(
    public dialogRef: MatDialogRef<FocusAreaDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCapDetails();
  }

  getCapDetails(){
    this.loadCounter += 1;
    this.http.get(`${environment.baseurl}/capabilityscoredata/capability-report/${this.data.uuid}`).subscribe(
      (res: any) => {
        this.strategy = res.data.strategy;
        this.style = res.data.style;
        this.loadCounter -= 1;
      },
      err => {
        console.error(err);
        this.loadCounter -= 1;
      }
    );
  }
}
