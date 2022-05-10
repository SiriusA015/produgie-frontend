import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoCallbackAzureComponent } from './sso-callback-azure.component';

describe('SsoCallbackAzureComponent', () => {
  let component: SsoCallbackAzureComponent;
  let fixture: ComponentFixture<SsoCallbackAzureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoCallbackAzureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoCallbackAzureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
