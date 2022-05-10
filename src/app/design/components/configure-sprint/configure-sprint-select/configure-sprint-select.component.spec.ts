import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSprintSelectComponent } from './configure-sprint-select.component';

describe('ConfigureSprintSelectComponent', () => {
  let component: ConfigureSprintSelectComponent;
  let fixture: ComponentFixture<ConfigureSprintSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureSprintSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSprintSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
