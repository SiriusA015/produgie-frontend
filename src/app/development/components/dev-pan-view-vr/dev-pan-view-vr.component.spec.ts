import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPanViewVrComponent } from './dev-pan-view-vr.component';

describe('DevPanViewVrComponent', () => {
  let component: DevPanViewVrComponent;
  let fixture: ComponentFixture<DevPanViewVrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevPanViewVrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPanViewVrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
