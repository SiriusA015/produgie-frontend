import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoCallbackGoogleComponent } from './sso-callback-google.component';

describe('SsoCallbackGoogleComponent', () => {
  let component: SsoCallbackGoogleComponent;
  let fixture: ComponentFixture<SsoCallbackGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoCallbackGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoCallbackGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
