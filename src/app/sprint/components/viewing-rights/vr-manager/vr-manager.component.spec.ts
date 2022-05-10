import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrManagerComponent } from './vr-manager.component';

describe('VrManagerComponent', () => {
  let component: VrManagerComponent;
  let fixture: ComponentFixture<VrManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
