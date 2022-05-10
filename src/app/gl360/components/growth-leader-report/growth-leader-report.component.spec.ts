import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthLeaderReportComponent } from './growth-leader-report.component';

describe('GrowthLeaderReportComponent', () => {
  let component: GrowthLeaderReportComponent;
  let fixture: ComponentFixture<GrowthLeaderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthLeaderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthLeaderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
