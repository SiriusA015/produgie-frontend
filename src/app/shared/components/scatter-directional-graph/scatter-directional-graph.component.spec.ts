import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterDirectionalGraphComponent } from './scatter-directional-graph.component';

describe('ScatterDirectionalGraphComponent', () => {
  let component: ScatterDirectionalGraphComponent;
  let fixture: ComponentFixture<ScatterDirectionalGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterDirectionalGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterDirectionalGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
