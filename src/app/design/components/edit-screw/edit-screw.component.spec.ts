import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScrewComponent } from './edit-screw.component';

describe('EditScrewComponent', () => {
  let component: EditScrewComponent;
  let fixture: ComponentFixture<EditScrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditScrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
