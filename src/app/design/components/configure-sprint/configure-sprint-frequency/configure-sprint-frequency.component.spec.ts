import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSprintFrequencyComponent } from './configure-sprint-frequency.component';

describe('ConfigureSprintFrequencyComponent', () => {
  let component: ConfigureSprintFrequencyComponent;
  let fixture: ComponentFixture<ConfigureSprintFrequencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureSprintFrequencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSprintFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
