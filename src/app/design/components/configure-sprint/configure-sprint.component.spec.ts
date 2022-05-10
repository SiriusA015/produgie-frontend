import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSprintComponent } from './configure-sprint.component';

describe('ConfigureSprintComponent', () => {
  let component: ConfigureSprintComponent;
  let fixture: ComponentFixture<ConfigureSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
