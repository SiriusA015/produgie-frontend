import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventDataComponent } from './edit-event-data.component';

describe('EditEventDataComponent', () => {
  let component: EditEventDataComponent;
  let fixture: ComponentFixture<EditEventDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
