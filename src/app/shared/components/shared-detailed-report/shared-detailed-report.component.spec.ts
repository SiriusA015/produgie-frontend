import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDetailedReportComponent } from './shared-detailed-report.component';

describe('SharedDetailedReportComponent', () => {
  let component: SharedDetailedReportComponent;
  let fixture: ComponentFixture<SharedDetailedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDetailedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDetailedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
