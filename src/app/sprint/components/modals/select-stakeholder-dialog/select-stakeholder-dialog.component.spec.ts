import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStakeholderDialogComponent } from './select-stakeholder-dialog.component';

describe('SelectStakeholderDialogComponent', () => {
  let component: SelectStakeholderDialogComponent;
  let fixture: ComponentFixture<SelectStakeholderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectStakeholderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStakeholderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
