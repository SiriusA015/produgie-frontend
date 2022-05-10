import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHeadingGl360Component } from './report-heading-gl360.component';

describe('ReportHeadingGl360Component', () => {
  let component: ReportHeadingGl360Component;
  let fixture: ComponentFixture<ReportHeadingGl360Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportHeadingGl360Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportHeadingGl360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
