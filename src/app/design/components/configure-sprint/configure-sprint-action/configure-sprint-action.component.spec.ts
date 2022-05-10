import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSprintActionComponent } from './configure-sprint-action.component';

describe('ConfigureSprintActionComponent', () => {
  let component: ConfigureSprintActionComponent;
  let fixture: ComponentFixture<ConfigureSprintActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureSprintActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSprintActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
