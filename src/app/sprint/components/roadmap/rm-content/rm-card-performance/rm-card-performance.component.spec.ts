import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmCardPerformanceComponent } from './rm-card-performance.component';

describe('RmCardPerformanceComponent', () => {
  let component: RmCardPerformanceComponent;
  let fixture: ComponentFixture<RmCardPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmCardPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmCardPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
