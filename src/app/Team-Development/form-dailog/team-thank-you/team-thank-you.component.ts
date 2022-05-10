import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-thank-you',
  templateUrl: './team-thank-you.component.html',
  styleUrls: ['./team-thank-you.component.scss']
})
export class TeamThankYouComponent implements OnInit {

  @Input() username

  constructor() { }

  ngOnInit(): void {
  }

}
