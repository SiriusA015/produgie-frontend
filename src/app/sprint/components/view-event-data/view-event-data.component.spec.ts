import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventDataComponent } from './view-event-data.component';

describe('ViewEventDataComponent', () => {
  let component: ViewEventDataComponent;
  let fixture: ComponentFixture<ViewEventDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEventDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
