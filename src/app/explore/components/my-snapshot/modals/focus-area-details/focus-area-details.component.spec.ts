import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusAreaDetailsComponent } from './focus-area-details.component';

describe('FocusAreaDetailsComponent', () => {
  let component: FocusAreaDetailsComponent;
  let fixture: ComponentFixture<FocusAreaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusAreaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusAreaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
