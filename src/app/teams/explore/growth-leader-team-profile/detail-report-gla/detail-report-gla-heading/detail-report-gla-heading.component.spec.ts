import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportGlaHeadingComponent } from './detail-report-gla-heading.component';

describe('DetailReportGlaHeadingComponent', () => {
  let component: DetailReportGlaHeadingComponent;
  let fixture: ComponentFixture<DetailReportGlaHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailReportGlaHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportGlaHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
