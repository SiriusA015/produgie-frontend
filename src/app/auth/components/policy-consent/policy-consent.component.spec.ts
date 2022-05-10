import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyConsentComponent } from './policy-consent.component';

describe('PolicyConsentComponent', () => {
  let component: PolicyConsentComponent;
  let fixture: ComponentFixture<PolicyConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
