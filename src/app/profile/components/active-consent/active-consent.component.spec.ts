import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveConsentComponent } from './active-consent.component';

describe('ActiveConsentComponent', () => {
  let component: ActiveConsentComponent;
  let fixture: ComponentFixture<ActiveConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
