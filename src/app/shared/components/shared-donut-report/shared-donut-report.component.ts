import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExploreService } from 'src/app/teams/explore/explore.service';

@Component({
  selector: 'app-shared-donut-report',
  templateUrl: './shared-donut-report.component.html',
  styleUrls: ['./shared-donut-report.component.scss']
})
export class SharedDonutReportComponent implements OnInit {
  team_id: string;
  loadCounter = 0;
  strategy: any;
  style: any;
  value: any;
  capabilityName: any;
  sub_diamension: any;
  style_sub_diamension: any;
  strategy_sub_diamension: any;
  type: string;
  score = [1, 2, 3];
  strategySubscalesArr: [] = [];
  styleSubscalesArr: [] = [];
  strategySubDimensionsArr: [] = [];
  styleSubDimensionsArr: [] = [];

  constructor(
    public dialogRef: MatDialogRef<SharedDonutReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exploreService: ExploreService
  ) { }

  ngOnInit(): void {

    this.team_id = localStorage.getItem('selectedTeamId');

    if (this.data.data.type == 'capId') {
      this.type = this.data.data.label;

    } else if (this.data.type == 'cap') {
      this.type = this.data.data.capabilityName;
    } else {
      this.type = this.data.data;
    }

    this.getDetailReport();
  }

  getDetailReport() {
    this.loadCounter += 1;
    this.exploreService.getdonutDescription(this.team_id, this.type).subscribe((res: any) => {
      this.loadCounter -= 1
      this.capabilityName = res?.data[0]?.capability_name;
      this.style = res.data[0]?.style;
      this.strategy = res.data[0]?.strategy;

      this.strategySubscalesArr = this.strategy[0]?.sub_dimensions?.filter(o => o.sub_dimension_name == 'Decisive' || o.sub_dimension_name == 'Rational' || o.sub_dimension_name == 'Integrative');
      this.styleSubscalesArr = this.style[0]?.sub_dimensions?.filter(o => o.sub_dimension_name == 'Decisive' || o.sub_dimension_name == 'Rational' || o.sub_dimension_name == 'Integrative');
      this.strategySubDimensionsArr = this.strategy[0]?.sub_dimensions?.filter(o => o.sub_dimension_name != 'Decisive' && o.sub_dimension_name != 'Rational' && o.sub_dimension_name != 'Integrative');
      this.styleSubDimensionsArr = this.style[0]?.sub_dimensions?.filter(o => o.sub_dimension_name != 'Decisive' && o.sub_dimension_name != 'Rational' && o.sub_dimension_name != 'Integrative');
    }, err => {
      this.loadCounter -= 1;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
