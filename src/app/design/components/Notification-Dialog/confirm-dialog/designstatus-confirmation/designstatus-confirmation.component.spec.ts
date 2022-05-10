import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignstatusConfirmationComponent } from './designstatus-confirmation.component';

describe('DesignstatusConfirmationComponent', () => {
  let component: DesignstatusConfirmationComponent;
  let fixture: ComponentFixture<DesignstatusConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignstatusConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignstatusConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
