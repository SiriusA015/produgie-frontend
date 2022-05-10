import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportCycleFooterComponent } from './detail-report-cycle-footer.component';

describe('DetailReportCycleFooterComponent', () => {
  let component: DetailReportCycleFooterComponent;
  let fixture: ComponentFixture<DetailReportCycleFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailReportCycleFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportCycleFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
