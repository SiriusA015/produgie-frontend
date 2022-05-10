import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-duration-overview',
  templateUrl: './sprint-duration-overview.component.html',
  styleUrls: ['./sprint-duration-overview.component.scss']
})
export class SprintDurationOverviewComponent implements OnInit {
  @Input() frequency: any;
  constructor() { }

  ngOnInit(): void {
  }

}
