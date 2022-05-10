import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCycleReportComponent } from './shared-cycle-report.component';

describe('SharedCycleReportComponent', () => {
  let component: SharedCycleReportComponent;
  let fixture: ComponentFixture<SharedCycleReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedCycleReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedCycleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
