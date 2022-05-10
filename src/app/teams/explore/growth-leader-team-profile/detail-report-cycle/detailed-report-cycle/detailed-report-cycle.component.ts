import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ExploreService } from '../../../explore.service';

@Component({
  selector: 'app-detailed-report-cycle',
  templateUrl: './detailed-report-cycle.component.html',
  styleUrls: ['./detailed-report-cycle.component.scss']
})
export class DetailedReportCycleComponent implements OnInit, OnChanges {
  loadCounter = 0;
  @Input() reportData;


  constructor(private exploreService: ExploreService) { }

  ngOnInit(): void {
 }

  ngOnChanges() {
    console.log(this.reportData, "reportData");
  }

}
