import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-report-teamprofile',
  templateUrl: './detailed-report-teamprofile.component.html',
  styleUrls: ['./detailed-report-teamprofile.component.scss']
})
export class DetailedReportTeamprofileComponent implements OnInit, OnChanges {

  @Input() scale: any;
  @Input() scale_description: any;
  @Input() lowScale: any;
  @Input() highScale: any;
  @Input() sub_scale: any;
  @Input() scale_avg: any;
  @Input() scale_rating: any;  
  score = [1, 2, 3];

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges() { }

}
