import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSettingComponent } from './team-settings.component';

describe('CreateTeamComponent', () => {
  let component: TeamSettingComponent;
  let fixture: ComponentFixture<TeamSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
