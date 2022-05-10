import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportCycleComponent } from './detail-report-cycle.component';

describe('DetailReportCycleComponent', () => {
  let component: DetailReportCycleComponent;
  let fixture: ComponentFixture<DetailReportCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailReportCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
