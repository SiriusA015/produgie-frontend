import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSprintSaveComponent } from './team-sprint-save.component';

describe('TeamSprintSaveComponent', () => {
  let component: TeamSprintSaveComponent;
  let fixture: ComponentFixture<TeamSprintSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSprintSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSprintSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
