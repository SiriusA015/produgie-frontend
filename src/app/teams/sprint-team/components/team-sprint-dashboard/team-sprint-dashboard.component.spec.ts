import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSprintDashboardComponent } from './team-sprint-dashboard.component';

describe('TeamSprintDashboardComponent', () => {
  let component: TeamSprintDashboardComponent;
  let fixture: ComponentFixture<TeamSprintDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSprintDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSprintDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
