import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSprintDialogComponent } from './change-sprint-dialog.component';

describe('DesignstatusConfirmationComponent', () => {
  let component: ChangeSprintDialogComponent;
  let fixture: ComponentFixture<ChangeSprintDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeSprintDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSprintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
