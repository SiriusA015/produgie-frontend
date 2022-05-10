import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsReviewModalComponent } from './teams-review-modal.component';

describe('TeamsReviewModalComponent', () => {
  let component: TeamsReviewModalComponent;
  let fixture: ComponentFixture<TeamsReviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsReviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
