import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomesComponent } from './outcomes.component';

describe('OutcomesComponent', () => {
  let component: OutcomesComponent;
  let fixture: ComponentFixture<OutcomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutcomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
