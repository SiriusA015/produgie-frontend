import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReportHeadingComponent } from './detailed-report-heading.component';

describe('DetailedReportHeadingComponent', () => {
  let component: DetailedReportHeadingComponent;
  let fixture: ComponentFixture<DetailedReportHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedReportHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedReportHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
