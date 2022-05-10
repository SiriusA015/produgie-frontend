import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSprintFrequencyComponent } from './team-sprint-frequency.component';

describe('TeamSprintFrequencyComponent', () => {
  let component: TeamSprintFrequencyComponent;
  let fixture: ComponentFixture<TeamSprintFrequencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSprintFrequencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSprintFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
