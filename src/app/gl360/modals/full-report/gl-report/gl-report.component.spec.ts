import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlReportComponent } from './gl-report.component';

describe('GlReportComponent', () => {
  let component: GlReportComponent;
  let fixture: ComponentFixture<GlReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
