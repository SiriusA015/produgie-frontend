import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsSprintCrewComponent } from './fs-sprint-crew.component';

describe('FsSprintCrewComponent', () => {
  let component: FsSprintCrewComponent;
  let fixture: ComponentFixture<FsSprintCrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsSprintCrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsSprintCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
