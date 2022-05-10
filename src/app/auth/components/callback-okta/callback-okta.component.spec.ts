import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackOktaComponent } from './callback-okta.component';

describe('CallbackOktaComponent', () => {
  let component: CallbackOktaComponent;
  let fixture: ComponentFixture<CallbackOktaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbackOktaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackOktaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
