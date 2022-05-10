import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSprintStrengthComponent } from './configure-sprint-strength.component';

describe('ConfigureSprintStrengthComponent', () => {
  let component: ConfigureSprintStrengthComponent;
  let fixture: ComponentFixture<ConfigureSprintStrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureSprintStrengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSprintStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
