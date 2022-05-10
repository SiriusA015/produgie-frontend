import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingRightsComponent } from './viewing-rights.component';

describe('ViewingRightsComponent', () => {
  let component: ViewingRightsComponent;
  let fixture: ComponentFixture<ViewingRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewingRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewingRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
