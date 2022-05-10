import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventCalendarDialogComponent } from './view-event-calendar-dialog.component';

describe('ViewEventCalendarDialogComponent', () => {
  let component: ViewEventCalendarDialogComponent;
  let fixture: ComponentFixture<ViewEventCalendarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEventCalendarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventCalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
