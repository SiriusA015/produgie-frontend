import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventComponent } from './view-event.component';

describe('ViewEventComponent', () => {
  let component: ViewEventComponent;
  let fixture: ComponentFixture<ViewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
