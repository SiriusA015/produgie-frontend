import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReportTeamprofileComponent } from './detailed-report-teamprofile.component';

describe('DetailedReportTeamprofileComponent', () => {
  let component: DetailedReportTeamprofileComponent;
  let fixture: ComponentFixture<DetailedReportTeamprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedReportTeamprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedReportTeamprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
