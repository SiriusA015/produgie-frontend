import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPlanCrewViewComponent } from './dev-plan-crew-view.component';

describe('DevPlanCrewViewComponent', () => {
  let component: DevPlanCrewViewComponent;
  let fixture: ComponentFixture<DevPlanCrewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevPlanCrewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPlanCrewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
