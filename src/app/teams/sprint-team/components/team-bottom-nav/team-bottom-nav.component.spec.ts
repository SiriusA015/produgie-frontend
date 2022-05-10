import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBottomNavComponent } from './team-bottom-nav.component';

describe('TeamBottomNavComponent', () => {
  let component: TeamBottomNavComponent;
  let fixture: ComponentFixture<TeamBottomNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBottomNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBottomNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
