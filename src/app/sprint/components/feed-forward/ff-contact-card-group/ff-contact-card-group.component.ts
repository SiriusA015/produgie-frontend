import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';

export interface SupportCrewCard {
  name: string;
  position: string;
  available: boolean;
  image: string;
}

@Component({
  selector: 'app-ff-contact-card-group',
  templateUrl: './ff-contact-card-group.component.html',
  styleUrls: ['./ff-contact-card-group.component.scss']
})
export class FfContactCardGroupComponent implements OnInit {

  supportCrews: SupportCrewCard[] = [];

  constructor() { }

  ngOnInit(): void {
    this.supportCrews = this.genFakeCards();
  }

  genFakeCards(): SupportCrewCard[] {
    const cards: SupportCrewCard[] = [];
    for (let i = 0; i < 10; i++) {
      const card = {
        name: faker.name.firstName(),
        position: faker.name.jobTitle(),
        available: faker.random.boolean(),
        image: faker.image.avatar()
      };

      cards.push(card);
    }
    return cards;
  }

}
