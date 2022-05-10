import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BehavioursComponent } from './behaviours.component';

describe('BehavioursComponent', () => {
  let component: BehavioursComponent;
  let fixture: ComponentFixture<BehavioursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BehavioursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BehavioursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
