import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPlanFeedbackComponent } from './dev-plan-feedback.component';

describe('DevPlanFeedbackComponent', () => {
  let component: DevPlanFeedbackComponent;
  let fixture: ComponentFixture<DevPlanFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevPlanFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPlanFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
