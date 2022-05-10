import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventCalendarDialogComponent } from './edit-event-calendar-dialog.component';

describe('EditEventCalendarDialogComponent', () => {
  let component: EditEventCalendarDialogComponent;
  let fixture: ComponentFixture<EditEventCalendarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventCalendarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventCalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
