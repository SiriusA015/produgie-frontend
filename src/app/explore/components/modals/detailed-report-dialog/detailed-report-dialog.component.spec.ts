import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReportDialogComponent } from './detailed-report-dialog.component';

describe('DetailedReportDialogComponent', () => {
  let component: DetailedReportDialogComponent;
  let fixture: ComponentFixture<DetailedReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
