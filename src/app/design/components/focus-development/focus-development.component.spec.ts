import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusDevelopmentComponent } from './focus-development.component';

describe('FocusDevelopmentComponent', () => {
  let component: FocusDevelopmentComponent;
  let fixture: ComponentFixture<FocusDevelopmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusDevelopmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
