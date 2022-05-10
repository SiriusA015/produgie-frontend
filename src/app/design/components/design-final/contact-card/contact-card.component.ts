import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class DesignContactCardComponent implements OnInit {
  @Input() crews: any[];
  // @Input() devcrews: any[] = [];
  @Input() design;
  constructor() {}
  username = '';
  picture = 'avatar_10';
  @Input() self: any;

  ngOnInit(): void {
    console.log(this.design, 'checking');

    this.username = localStorage.getItem('userName');
    console.log(this.username);
    this.picture = localStorage.getItem('picture');
    console.log(this.crews);

    function titleCaseWord(word: string) {
      if (!word) return word;
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
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
