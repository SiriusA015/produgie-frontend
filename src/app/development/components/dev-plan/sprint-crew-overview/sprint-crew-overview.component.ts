import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-crew-overview',
  templateUrl: './sprint-crew-overview.component.html',
  styleUrls: ['./sprint-crew-overview.component.scss'],
})
export class SprintCrewOverviewComponent implements OnInit {
  @Input() crews: any[];
  @Input() self: any;
  constructor() {}

  ngOnInit(): void {}

  getRole(crew) {
    if (crew.isManager) {
      return 'manager';
    } else if (crew.isMentor) {
      return 'mentor';
    } else if (crew.isPeerOthers) {
      return 'peer';
    } else if (crew.isTeam) {
      return 'team';
    } else if (crew.isCustomer) {
      return 'customer';
    } else if (crew.isCoach) {
      return 'coach';
    } else {
      return 'other';
    }
  }
}
