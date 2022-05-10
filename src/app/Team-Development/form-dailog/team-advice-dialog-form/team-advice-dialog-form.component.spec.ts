import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAdviceDialogFormComponent } from './team-advice-dialog-form.component';

describe('TeamAdviceDialogFormComponent', () => {
  let component: TeamAdviceDialogFormComponent;
  let fixture: ComponentFixture<TeamAdviceDialogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAdviceDialogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAdviceDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
