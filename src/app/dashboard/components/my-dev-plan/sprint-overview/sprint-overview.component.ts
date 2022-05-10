import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-md-sprint-overview',
  templateUrl: './sprint-overview.component.html',
  styleUrls: ['./sprint-overview.component.scss']
})
export class MDSprintOverviewComponent implements OnInit {
  @Input() sprint;
  @Input() sprintNo;

  constructor() { }

  ngOnInit(): void {
  }

}
