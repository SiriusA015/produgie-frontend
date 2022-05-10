import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcNotificationDialogComponent } from './wc-notification-dialog.component';

describe('WcNotificationDialogComponent', () => {
  let component: WcNotificationDialogComponent;
  let fixture: ComponentFixture<WcNotificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcNotificationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
