import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutBoxComponent } from './donut-box.component';

describe('DonutBoxComponent', () => {
  let component: DonutBoxComponent;
  let fixture: ComponentFixture<DonutBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
