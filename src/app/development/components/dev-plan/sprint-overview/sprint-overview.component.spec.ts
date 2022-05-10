import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintOverviewComponent } from './sprint-overview.component';

describe('SprintOverviewComponent', () => {
  let component: SprintOverviewComponent;
  let fixture: ComponentFixture<SprintOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
