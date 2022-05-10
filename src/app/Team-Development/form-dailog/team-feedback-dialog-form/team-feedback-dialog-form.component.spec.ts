import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFeedbackDialogFormComponent } from './team-feedback-dialog-form.component';

describe('TeamFeedbackDialogFormComponent', () => {
  let component: TeamFeedbackDialogFormComponent;
  let fixture: ComponentFixture<TeamFeedbackDialogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamFeedbackDialogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFeedbackDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
