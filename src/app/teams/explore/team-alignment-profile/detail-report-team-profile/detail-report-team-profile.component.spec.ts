import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportTeamProfileComponent } from './detail-report-team-profile.component';

describe('DetailReportTeamProfileComponent', () => {
  let component: DetailReportTeamProfileComponent;
  let fixture: ComponentFixture<DetailReportTeamProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailReportTeamProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportTeamProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
