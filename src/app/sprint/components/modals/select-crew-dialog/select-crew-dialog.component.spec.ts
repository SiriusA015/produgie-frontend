import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCrewDialogComponent } from './select-crew-dialog.component';

describe('SelectCrewDialogComponent', () => {
  let component: SelectCrewDialogComponent;
  let fixture: ComponentFixture<SelectCrewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCrewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCrewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
