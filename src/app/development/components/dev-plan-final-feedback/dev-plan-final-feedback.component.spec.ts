import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPlanFinalFeedbackComponent } from './dev-plan-final-feedback.component';

describe('DevPlanFinalFeedbackComponent', () => {
  let component: DevPlanFinalFeedbackComponent;
  let fixture: ComponentFixture<DevPlanFinalFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevPlanFinalFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPlanFinalFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
