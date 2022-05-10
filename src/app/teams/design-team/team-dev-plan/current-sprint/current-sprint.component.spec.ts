import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSprintComponent } from './current-sprint.component';

describe('CurrentSprintComponent', () => {
  let component: CurrentSprintComponent;
  let fixture: ComponentFixture<CurrentSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
