import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsNotificationPanelComponent } from './teams-notification-panel.component';

describe('TeamsNotificationPanelComponent', () => {
  let component: TeamsNotificationPanelComponent;
  let fixture: ComponentFixture<TeamsNotificationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsNotificationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsNotificationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
