import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAlignmentProfileComponent } from './team-alignment-profile.component';

describe('TeamAlignmentProfileComponent', () => {
  let component: TeamAlignmentProfileComponent;
  let fixture: ComponentFixture<TeamAlignmentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAlignmentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAlignmentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
