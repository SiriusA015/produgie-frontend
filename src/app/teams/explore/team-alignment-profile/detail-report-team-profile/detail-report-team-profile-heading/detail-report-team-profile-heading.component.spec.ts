import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportTeamProfileHeadingComponent } from './detail-report-team-profile-heading.component';

describe('DetailReportTeamProfileHeadingComponent', () => {
  let component: DetailReportTeamProfileHeadingComponent;
  let fixture: ComponentFixture<DetailReportTeamProfileHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailReportTeamProfileHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportTeamProfileHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
