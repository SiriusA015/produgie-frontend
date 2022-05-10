import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDevPlanComponent } from './team-dev-plan.component';

describe('DevPlanComponent', () => {
  let component: TeamDevPlanComponent;
  let fixture: ComponentFixture<TeamDevPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDevPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDevPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
