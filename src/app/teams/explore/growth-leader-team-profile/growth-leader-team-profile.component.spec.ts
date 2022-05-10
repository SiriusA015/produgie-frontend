import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthLeaderTeamProfileComponent } from './growth-leader-team-profile.component';

describe('GrowthLeaderTeamProfileComponent', () => {
  let component: GrowthLeaderTeamProfileComponent;
  let fixture: ComponentFixture<GrowthLeaderTeamProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthLeaderTeamProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthLeaderTeamProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
