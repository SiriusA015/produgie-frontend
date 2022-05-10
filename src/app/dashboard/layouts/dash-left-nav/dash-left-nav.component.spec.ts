import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLeftNavComponent } from './dash-left-nav.component';

describe('DashLeftNavComponent', () => {
  let component: DashLeftNavComponent;
  let fixture: ComponentFixture<DashLeftNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashLeftNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
