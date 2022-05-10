import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportGlaComponent } from './detail-report-gla.component';

describe('DetailReportGlaComponent', () => {
  let component: DetailReportGlaComponent;
  let fixture: ComponentFixture<DetailReportGlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailReportGlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportGlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
