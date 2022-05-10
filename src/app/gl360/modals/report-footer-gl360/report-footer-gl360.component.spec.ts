import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFooterGl360Component } from './report-footer-gl360.component';

describe('ReportFooterGl360Component', () => {
  let component: ReportFooterGl360Component;
  let fixture: ComponentFixture<ReportFooterGl360Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFooterGl360Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFooterGl360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
