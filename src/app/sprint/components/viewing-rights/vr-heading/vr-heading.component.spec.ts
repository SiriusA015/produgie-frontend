import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrHeadingComponent } from './vr-heading.component';

describe('VrHeadingComponent', () => {
  let component: VrHeadingComponent;
  let fixture: ComponentFixture<VrHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
