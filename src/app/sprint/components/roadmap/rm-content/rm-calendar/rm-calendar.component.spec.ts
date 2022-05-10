import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmCalendarComponent } from './rm-calendar.component';

describe('RmCalendarComponent', () => {
  let component: RmCalendarComponent;
  let fixture: ComponentFixture<RmCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
