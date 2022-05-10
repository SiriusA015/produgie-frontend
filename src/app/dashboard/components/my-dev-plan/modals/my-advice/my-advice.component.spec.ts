import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdviceComponent } from './my-advice.component';

describe('MyAdviceComponent', () => {
  let component: MyAdviceComponent;
  let fixture: ComponentFixture<MyAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
