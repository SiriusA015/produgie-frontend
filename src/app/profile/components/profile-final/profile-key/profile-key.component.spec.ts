import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileKeyComponent } from './profile-key.component';

describe('DesignKeyComponent', () => {
  let component: ProfileKeyComponent;
  let fixture: ComponentFixture<ProfileKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
