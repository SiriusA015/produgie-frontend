import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-md-sprint-crew-overview',
  templateUrl: './sprint-crew-overview.component.html',
  styleUrls: ['./sprint-crew-overview.component.scss']
})
export class MDSprintCrewOverviewComponent implements OnInit {

  @Input() crews: any[];
  constructor() {}
  username = '';
  picture = 'avatar_10';

  ngOnInit(): void {
    this.username = localStorage.getItem('userName');
    this.picture = localStorage.getItem('picture');
  }

  getRole(crew) {
    if (crew.isManager) {
      return 'manager';
    } else if (crew.isMentor) {
      return 'mentor';
    } else if(crew.isPeerOthers) {
      return 'peer';
    }else if(crew.isTeam) {
      return 'team';
    }else if(crew.isCustomer) {
      return 'customer';
    }else if(crew.isCoach) {
      return 'coach';
    }else {
      return 'other';
    }
  }

}
