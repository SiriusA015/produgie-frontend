import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSprintCrewComponent } from './team-sprint-crew.component';

describe('TeamSprintCrewComponent', () => {
  let component: TeamSprintCrewComponent;
  let fixture: ComponentFixture<TeamSprintCrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSprintCrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSprintCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
