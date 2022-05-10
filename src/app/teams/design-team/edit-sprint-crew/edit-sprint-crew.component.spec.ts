import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSprintCrewComponent } from './edit-sprint-crew.component';

describe('EditSprintCrewComponent', () => {
  let component: EditSprintCrewComponent;
  let fixture: ComponentFixture<EditSprintCrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSprintCrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSprintCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
