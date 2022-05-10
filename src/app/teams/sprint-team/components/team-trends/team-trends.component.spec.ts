import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTrendsComponent } from './team-trends.component';

describe('TeamTrendsComponent', () => {
  let component: TeamTrendsComponent;
  let fixture: ComponentFixture<TeamTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
