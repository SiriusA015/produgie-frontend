import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlaRatingComponent } from './gla-rating.component';

describe('GlaRatingComponent', () => {
  let component: GlaRatingComponent;
  let fixture: ComponentFixture<GlaRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlaRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlaRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
