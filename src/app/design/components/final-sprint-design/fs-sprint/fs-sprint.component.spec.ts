import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsSprintComponent } from './fs-sprint.component';

describe('FsSprintComponent', () => {
  let component: FsSprintComponent;
  let fixture: ComponentFixture<FsSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
