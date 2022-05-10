import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { NguCarousel, NguCarouselConfig  } from '@ngu/carousel';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class DesignContactCardComponent implements OnInit, OnChanges {
  @Input() crews: any[] = [];
  @Input() design;
  @Input() self: any;

  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 2, sm: 2, md: 3, lg: 4, xl: 6, all: 0 },
    // load: 3,
    loop: false,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };

  constructor() {}

  crewsItems = [];
  email = '';
  picture = 'avatar_10';
  withAnim = true;
  resetAnim = true;

  ngOnInit(): void {

    this.email = localStorage.getItem('email');
    
    function titleCaseWord(word: string) {
      if (!word) return word;
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
  }

  ngOnChanges() {
    setTimeout(() => {
      if (this.crews != null){
        this.crews.map((item)=>{
          this.crewsItems.push({
            name: item.name,
            role: this.email==item.email?"self":this.getRole(item),
            avatar: item.avatar
          })
        })
      }
    }, 1000);
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

  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }
}
