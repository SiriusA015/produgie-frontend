import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReportGlaComponent } from './detailed-report-gla.component';

describe('DetailedReportGlaComponent', () => {
  let component: DetailedReportGlaComponent;
  let fixture: ComponentFixture<DetailedReportGlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedReportGlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedReportGlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
