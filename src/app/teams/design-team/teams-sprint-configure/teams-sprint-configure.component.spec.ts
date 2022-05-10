import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsSprintConfigureComponent } from './teams-sprint-configure.component';

describe('TeamsSprintConfigureComponent', () => {
  let component: TeamsSprintConfigureComponent;
  let fixture: ComponentFixture<TeamsSprintConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsSprintConfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsSprintConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
