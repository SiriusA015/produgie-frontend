import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAlignmentProfileComponent } from './shared-alignment-profile.component';

describe('SharedAlignmentProfileComponent', () => {
  let component: SharedAlignmentProfileComponent;
  let fixture: ComponentFixture<SharedAlignmentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedAlignmentProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedAlignmentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
