import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlNomineeComponent } from './gl-nominee.component';

describe('GlNomineeComponent', () => {
  let component: GlNomineeComponent;
  let fixture: ComponentFixture<GlNomineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlNomineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
