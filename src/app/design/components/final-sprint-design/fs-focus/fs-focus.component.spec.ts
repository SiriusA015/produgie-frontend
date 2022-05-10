import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsFocusComponent } from './fs-focus.component';

describe('FsFocusComponent', () => {
  let component: FsFocusComponent;
  let fixture: ComponentFixture<FsFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
