import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamThankYouComponent } from './team-thank-you.component';

describe('TeamThankYouComponent', () => {
  let component: TeamThankYouComponent;
  let fixture: ComponentFixture<TeamThankYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamThankYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
