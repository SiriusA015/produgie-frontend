import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-md-sprint-duration-overview',
  templateUrl: './sprint-duration-overview.component.html',
  styleUrls: ['./sprint-duration-overview.component.scss']
})
export class MDSprintDurationOverviewComponent implements OnInit {
  @Input() frequency: any;
  constructor() { }

  ngOnInit(): void {
  }

}
