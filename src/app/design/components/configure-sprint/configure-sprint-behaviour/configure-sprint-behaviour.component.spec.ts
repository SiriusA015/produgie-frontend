import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSprintBehaviourComponent } from './configure-sprint-behaviour.component';

describe('ConfigureSprintBehaviourComponent', () => {
  let component: ConfigureSprintBehaviourComponent;
  let fixture: ComponentFixture<ConfigureSprintBehaviourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureSprintBehaviourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSprintBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
