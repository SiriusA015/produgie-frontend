import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectActivityDialogComponent } from './select-activity-dialog.component';

describe('SelectActivityDialogComponent', () => {
  let component: SelectActivityDialogComponent;
  let fixture: ComponentFixture<SelectActivityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectActivityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
