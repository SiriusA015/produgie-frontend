import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-overview',
  templateUrl: './sprint-overview.component.html',
  styleUrls: ['./sprint-overview.component.scss']
})
export class SprintOverviewComponent implements OnInit {
  @Input() sprint;
  @Input() sprintNo;

  constructor() { }

  ngOnInit(): void {
  }

}
