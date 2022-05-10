import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBehaviourOutcomeComponent } from './action-behaviour-outcome.component';

describe('ActionBehaviourOutcomeComponent', () => {
  let component: ActionBehaviourOutcomeComponent;
  let fixture: ComponentFixture<ActionBehaviourOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionBehaviourOutcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionBehaviourOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
