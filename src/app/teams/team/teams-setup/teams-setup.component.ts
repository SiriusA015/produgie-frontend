import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-setup',
  templateUrl: './teams-setup.component.html',
  styleUrls: ['./teams-setup.component.scss']
})
export class TeamsSetupComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
    
  }

  createTeam(){
    console.log("test");
    this.router.navigate(['/teams/team-settings']);
  }

}


