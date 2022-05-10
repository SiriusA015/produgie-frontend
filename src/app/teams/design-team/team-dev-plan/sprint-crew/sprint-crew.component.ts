import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DesignService } from '../../design.service';

@Component({
  selector: 'app-sprint-crew',
  templateUrl: './sprint-crew.component.html',
  styleUrls: ['./sprint-crew.component.scss']
})
export class SprintCrewComponent implements OnInit {
  @Input() crews: any[];
  @Input() design;
  username = '';
  picture = 'avatar_10';
  @Input() self: any;
  message: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataService,
    private configService: ConfigService,
    private designService: DesignService,
    public dialog: MatDialog
  ) { }



  ngOnInit(): void {

    this.username = localStorage.getItem('userName');
    this.picture = localStorage.getItem('picture');
    this.dataService.sharedMessage.subscribe(message => this.message = message);

  }

  editCrew() {
    this.router.navigateByUrl('teams/design/teams-sprint-crew');
    this.dataService.nextMessage({ isEdit: true });
  }

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

