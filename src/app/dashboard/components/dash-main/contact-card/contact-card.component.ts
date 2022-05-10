import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {

  constructor() {}

  username = '';
  picture = 'avatar_10';

  ngOnInit(): void {
    this.username = localStorage.getItem('userName');
    this.picture = localStorage.getItem('picture');
  }

}
