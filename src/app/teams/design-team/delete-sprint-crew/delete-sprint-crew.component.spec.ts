import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSprintCrewComponent } from './delete-sprint-crew.component';

describe('DeleteSprintCrewComponent', () => {
  let component: DeleteSprintCrewComponent;
  let fixture: ComponentFixture<DeleteSprintCrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSprintCrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSprintCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
