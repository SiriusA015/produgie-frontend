import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPortalComponent } from './team-portal.component';

describe('TeamPortalComponent', () => {
  let component: TeamPortalComponent;
  let fixture: ComponentFixture<TeamPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
