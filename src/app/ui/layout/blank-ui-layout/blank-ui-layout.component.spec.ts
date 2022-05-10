import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankUiLayoutComponent } from './blank-ui-layout.component';

describe('BlankUiLayoutComponent', () => {
  let component: BlankUiLayoutComponent;
  let fixture: ComponentFixture<BlankUiLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankUiLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankUiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
