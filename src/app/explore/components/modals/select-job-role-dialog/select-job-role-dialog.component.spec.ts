import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectJobRoleDialogComponent } from './select-job-role-dialog.component';

describe('SelectJobRoleDialogComponent', () => {
  let component: SelectJobRoleDialogComponent;
  let fixture: ComponentFixture<SelectJobRoleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectJobRoleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectJobRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
