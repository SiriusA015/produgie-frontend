import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSideNavComponent } from './profile-side-nav.component';

describe('ProfileSideNavComponent', () => {
  let component: ProfileSideNavComponent;
  let fixture: ComponentFixture<ProfileSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
