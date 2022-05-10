import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberNavbarComponent } from './team-member-navbar.component';

describe('TeamMemberNavbarComponent', () => {
  let component: TeamMemberNavbarComponent;
  let fixture: ComponentFixture<TeamMemberNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
