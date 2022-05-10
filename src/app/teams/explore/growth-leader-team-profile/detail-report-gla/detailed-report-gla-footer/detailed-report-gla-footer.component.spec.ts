import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReportGlaFooterComponent } from './detailed-report-gla-footer.component';

describe('DetailedReportGlaFooterComponent', () => {
  let component: DetailedReportGlaFooterComponent;
  let fixture: ComponentFixture<DetailedReportGlaFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedReportGlaFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedReportGlaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
