import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcReviewDialogComponent } from './wc-review-dialog.component';

describe('WcReviewDialogComponent', () => {
  let component: WcReviewDialogComponent;
  let fixture: ComponentFixture<WcReviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcReviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
