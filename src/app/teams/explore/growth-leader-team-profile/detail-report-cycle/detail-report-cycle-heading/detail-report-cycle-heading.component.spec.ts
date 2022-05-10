import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportCycleHeadingComponent } from './detail-report-cycle-heading.component';

describe('DetailReportCycleHeadingComponent', () => {
  let component: DetailReportCycleHeadingComponent;
  let fixture: ComponentFixture<DetailReportCycleHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailReportCycleHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportCycleHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
