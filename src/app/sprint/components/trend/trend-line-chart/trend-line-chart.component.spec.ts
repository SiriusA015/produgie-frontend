import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendLineChartComponent } from './trend-line-chart.component';

describe('TrendLineChartComponent', () => {
  let component: TrendLineChartComponent;
  let fixture: ComponentFixture<TrendLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
