import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCancelComponent } from './event-cancel.component';

describe('EventCancelComponent', () => {
  let component: EventCancelComponent;
  let fixture: ComponentFixture<EventCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
