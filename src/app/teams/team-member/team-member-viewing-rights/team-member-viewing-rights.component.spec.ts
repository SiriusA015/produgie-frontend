import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberViewingRightsComponent } from './team-member-viewing-rights.component';

describe('TeamMemberViewingRightsComponent', () => {
  let component: TeamMemberViewingRightsComponent;
  let fixture: ComponentFixture<TeamMemberViewingRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberViewingRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberViewingRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
