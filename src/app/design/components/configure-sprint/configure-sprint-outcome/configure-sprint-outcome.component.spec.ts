import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSprintOutcomeComponent } from './configure-sprint-outcome.component';

describe('ConfigureSprintOutcomeComponent', () => {
  let component: ConfigureSprintOutcomeComponent;
  let fixture: ComponentFixture<ConfigureSprintOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureSprintOutcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSprintOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
