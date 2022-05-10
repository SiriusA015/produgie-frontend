import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintReviewEventDialogComponent } from './sprint-review-event-dialog.component';

describe('SprintReviewEventDialogComponent', () => {
  let component: SprintReviewEventDialogComponent;
  let fixture: ComponentFixture<SprintReviewEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintReviewEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintReviewEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
