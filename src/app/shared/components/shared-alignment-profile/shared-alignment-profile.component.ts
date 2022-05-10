import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExploreService } from 'src/app/teams/explore/explore.service';

@Component({
  selector: 'app-shared-alignment-profile',
  templateUrl: './shared-alignment-profile.component.html',
  styleUrls: ['./shared-alignment-profile.component.scss']
})
export class SharedAlignmentProfileComponent implements OnInit {
  strategy: any;
  style: any;
  score = [1, 2, 3];
  scaleData: any;
  type: any;

  constructor(
    public dialogRef: MatDialogRef<SharedAlignmentProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private exploreService: ExploreService
  ) { }

  ngOnInit(): void {
    if (this.data.type == 'align') {
      this.type = this.data.data.scale;
    }
    if (this.data.type == 'alignment-profile') {
      this.type = this.data.data;
    }
    this.exploreService.getScaleReportData(this.type).subscribe((data: any) => {
      this.scaleData = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
