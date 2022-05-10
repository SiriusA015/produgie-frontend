import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incomplete-gla',
  templateUrl: './incomplete-gla.component.html',
  styleUrls: ['./incomplete-gla.component.scss']
})
export class IncompleteGlaComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goToGLA(){
    localStorage.setItem('activeModule', 'LEAD')
    this.router.navigate(['/explore/aboutme']);
  }
  goToTeams(){
    this.router.navigate(['/teams/team-settings']);
  }
}
