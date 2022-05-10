import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-abo-overview',
  templateUrl: './abo-overview.component.html',
  styleUrls: ['./abo-overview.component.scss']
})
export class AboOverviewComponent implements OnInit, OnChanges {
  @Input() actions: any[] = [];
  @Input() behaviours: any[] = [];
  @Input() outcomes: any[] = [];
  @Input() sprintId;
  message: any;
  card1 = 1;
  card2 = 1;
  card3 = 1;
  name = 'Angular';
  slideNo = 0;
  withAnim = true;
  resetAnim = true;

  constructor(private cdr: ChangeDetectorRef) {}
  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };
  carouselItems = [];
  carouselItems1 = [];
  carouselItems2 = [];
  ngOnInit() {
  }

  ngOnChanges() {
    setTimeout(() => {
      this.carouselItems = this.actions;
      this.carouselItems1 = this.behaviours;
      this.carouselItems2 = this.outcomes;
      this.cdr.detectChanges();
    }, 1000);

  }
  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }
}
