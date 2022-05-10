import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReportCycleComponent } from './detailed-report-cycle.component';

describe('DetailedReportCycleComponent', () => {
  let component: DetailedReportCycleComponent;
  let fixture: ComponentFixture<DetailedReportCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedReportCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedReportCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
