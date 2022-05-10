import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutCycleComponent } from './donut-cycle.component';

describe('DonutCycleComponent', () => {
  let component: DonutCycleComponent;
  let fixture: ComponentFixture<DonutCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
