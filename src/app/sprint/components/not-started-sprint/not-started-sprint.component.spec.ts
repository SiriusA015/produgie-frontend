import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotStartedSprintComponent } from './not-started-sprint.component';

describe('NotStartedSprintComponent', () => {
  let component: NotStartedSprintComponent;
  let fixture: ComponentFixture<NotStartedSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotStartedSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotStartedSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
