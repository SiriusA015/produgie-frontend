import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventCalendarDialogComponent } from './add-event-calendar-dialog.component';

describe('AddEventCalendarDialogComponent', () => {
  let component: AddEventCalendarDialogComponent;
  let fixture: ComponentFixture<AddEventCalendarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventCalendarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventCalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
