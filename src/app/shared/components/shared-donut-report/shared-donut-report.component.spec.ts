import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDonutReportComponent } from './shared-donut-report.component';

describe('SharedDonutReportComponent', () => {
  let component: SharedDonutReportComponent;
  let fixture: ComponentFixture<SharedDonutReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDonutReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDonutReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
