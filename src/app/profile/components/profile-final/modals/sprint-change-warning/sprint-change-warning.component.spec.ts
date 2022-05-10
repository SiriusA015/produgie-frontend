import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintChangeWarningComponent } from './sprint-change-warning.component';

describe('SprintChangeWarningComponent', () => {
  let component: SprintChangeWarningComponent;
  let fixture: ComponentFixture<SprintChangeWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintChangeWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintChangeWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
