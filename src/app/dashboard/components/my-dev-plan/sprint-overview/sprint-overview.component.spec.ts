import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDSprintOverviewComponent } from './sprint-overview.component';

describe('MDSprintOverviewComponent', () => {
  let component: MDSprintOverviewComponent;
  let fixture: ComponentFixture<MDSprintOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDSprintOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDSprintOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
