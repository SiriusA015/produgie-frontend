import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportTeamProfileFooterComponent } from './detail-report-team-profile-footer.component';

describe('DetailReportTeamProfileFooterComponent', () => {
  let component: DetailReportTeamProfileFooterComponent;
  let fixture: ComponentFixture<DetailReportTeamProfileFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailReportTeamProfileFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportTeamProfileFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
