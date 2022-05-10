import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchmarkModalComponent } from './benchmark-modal.component';

describe('BenchmarkModalComponent', () => {
  let component: BenchmarkModalComponent;
  let fixture: ComponentFixture<BenchmarkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenchmarkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
