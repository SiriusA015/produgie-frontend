import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReportFooterComponent } from './detailed-report-footer.component';

describe('DetailedReportFooterComponent', () => {
  let component: DetailedReportFooterComponent;
  let fixture: ComponentFixture<DetailedReportFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedReportFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedReportFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
