import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDevelopmentPlanComponent } from './guest-development-plan.component';

describe('GuestDevelopmentPlanComponent', () => {
  let component: GuestDevelopmentPlanComponent;
  let fixture: ComponentFixture<GuestDevelopmentPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestDevelopmentPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestDevelopmentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
