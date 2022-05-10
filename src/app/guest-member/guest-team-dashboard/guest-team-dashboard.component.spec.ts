import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestTeamDashboardComponent } from './guest-team-dashboard.component';

describe('GuestTeamDashboardComponent', () => {
  let component: GuestTeamDashboardComponent;
  let fixture: ComponentFixture<GuestTeamDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestTeamDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestTeamDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
