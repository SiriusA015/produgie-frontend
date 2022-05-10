import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventBottomDialogComponent } from './add-event-bottom-dialog.component';

describe('AddEventBottomDialogComponent', () => {
  let component: AddEventBottomDialogComponent;
  let fixture: ComponentFixture<AddEventBottomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventBottomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventBottomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
