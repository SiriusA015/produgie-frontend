import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTrendComponent } from './result-trend.component';

describe('TrendComponent', () => {
  let component: ResultTrendComponent;
  let fixture: ComponentFixture<ResultTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
