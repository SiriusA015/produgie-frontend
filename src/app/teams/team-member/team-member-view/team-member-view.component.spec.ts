import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberViewComponent } from './team-member-view.component';

describe('TeamMemberViewComponent', () => {
  let component: TeamMemberViewComponent;
  let fixture: ComponentFixture<TeamMemberViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
