import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSprintOverlayComponent } from './design-sprint-overlay.component';

describe('DesignSprintOverlayComponent', () => {
  let component: DesignSprintOverlayComponent;
  let fixture: ComponentFixture<DesignSprintOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignSprintOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignSprintOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
