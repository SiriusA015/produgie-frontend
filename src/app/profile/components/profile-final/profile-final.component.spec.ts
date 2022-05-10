import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFinalComponent } from './profile-final.component';

describe('DesignFinalComponent', () => {
  let component: ProfileFinalComponent;
  let fixture: ComponentFixture<ProfileFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
