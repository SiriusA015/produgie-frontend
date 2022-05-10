import { DataService } from '../../../service/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, AfterViewInit, OnChanges } from '@angular/core';
import { NguCarousel, NguCarouselConfig  } from '@ngu/carousel';
import * as _ from 'lodash';
@Component({
  selector: 'app-profile-key',
  templateUrl: './profile-key.component.html',
  styleUrls: ['./profile-key.component.scss']
})

export class ProfileKeyComponent implements OnInit, OnChanges {
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

  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 3, lg: 3, all: 0 },
    // load: 3,
    loop: false,
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
  constructor( private router: Router, private dataService: DataService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.dataService.sharedMessage.subscribe(message => this.message = message);
  }
  editABO(){
    this.router.navigateByUrl('/design/sprint');
    this.dataService.nextMessage({isEdit: true});
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
  changeCard1(id) {

  }
  changeCard2(id) {

  }
  changeCard3(id) {

  }


}
