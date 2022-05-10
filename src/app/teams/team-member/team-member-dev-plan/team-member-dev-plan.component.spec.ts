import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberDevPlanComponent } from './team-member-dev-plan.component';

describe('TeamMemberDevPlanComponent', () => {
  let component: TeamMemberDevPlanComponent;
  let fixture: ComponentFixture<TeamMemberDevPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberDevPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberDevPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
