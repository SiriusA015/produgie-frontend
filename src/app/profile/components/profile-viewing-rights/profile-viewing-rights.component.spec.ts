import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewingRightsComponent } from './profile-viewing-rights.component';

describe('ProfileViewingRightsComponent', () => {
  let component: ProfileViewingRightsComponent;
  let fixture: ComponentFixture<ProfileViewingRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileViewingRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewingRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
