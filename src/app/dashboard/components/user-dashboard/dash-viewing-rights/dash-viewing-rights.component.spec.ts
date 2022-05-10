import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashViewingRightsComponent } from './dash-viewing-rights.component';

describe('DashViewingRightsComponent', () => {
  let component: DashViewingRightsComponent;
  let fixture: ComponentFixture<DashViewingRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashViewingRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashViewingRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
