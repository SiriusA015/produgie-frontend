import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/design/service/data.service';

@Component({
  selector: 'app-teams-left-nav',
  templateUrl: './teams-left-nav.component.html',
  styleUrls: ['./teams-left-nav.component.scss']
})
export class TeamsLeftNavComponent implements OnInit {
  message: any;

  routes = {
    fad: ['/design/sprint-focus'],
    sprint: [
      '/design/sprint-configure',
      '/design/sprint/2',
    ],
    support: ['/design/sprint-crew-role'],
    confirm: [
      '/design/sprint-frequency',
      '/design/sprint-final'
    ]
  };

  constructor(private http: HttpClient, private router: Router, private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.sharedMessage.subscribe(message => {
      this.message = message;
    });

  }

  get currentRoute() {
    return this.router.url;
  }

}



