import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ff-contact-card',
  templateUrl: './ff-contact-card.component.html',
  styleUrls: ['./ff-contact-card.component.scss']
})
export class FfContactCardComponent implements OnInit {

  @Input() supportCrew;

  constructor() { }

  ngOnInit(): void {
  }

}
