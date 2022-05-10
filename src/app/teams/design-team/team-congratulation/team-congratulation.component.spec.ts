import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCongratulationComponent } from './team-congratulation.component';

describe('TeamCongratulationComponent', () => {
  let component: TeamCongratulationComponent;
  let fixture: ComponentFixture<TeamCongratulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCongratulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCongratulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
