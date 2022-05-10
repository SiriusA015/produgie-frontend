import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, AfterViewInit, OnChanges } from '@angular/core';
import { NguCarousel, NguCarouselConfig  } from '@ngu/carousel';
import { DataService } from 'src/app/design/service/data.service';

@Component({
  selector: 'app-action-behaviour-outcome',
  templateUrl: './action-behaviour-outcome.component.html',
  styleUrls: ['./action-behaviour-outcome.component.scss']
})

export class ActionBehaviourOutcomeComponent implements OnInit, AfterViewInit, OnChanges {
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
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    // load: 3,
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
  constructor( private router: Router, private dataService: DataService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.dataService.sharedMessage.subscribe(message => this.message = message);
  }
  editABO(){
    this.router.navigateByUrl('teams/design/configure');
    this.dataService.nextMessage({isEdit: true});
    this.dataService.setActionEditable(true);
  }

  ngAfterViewInit() {
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

