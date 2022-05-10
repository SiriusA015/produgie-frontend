import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStakeholderDialogComponent } from './add-stakeholder-dialog.component';

describe('AddStakeholderDialogComponent', () => {
  let component: AddStakeholderDialogComponent;
  let fixture: ComponentFixture<AddStakeholderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStakeholderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStakeholderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
