import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffortComponent } from './effort.component';

describe('EffortComponent', () => {
  let component: EffortComponent;
  let fixture: ComponentFixture<EffortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
