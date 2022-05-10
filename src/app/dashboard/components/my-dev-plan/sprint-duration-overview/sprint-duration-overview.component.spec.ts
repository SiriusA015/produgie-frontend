import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDSprintDurationOverviewComponent } from './sprint-duration-overview.component';

describe('MDSprintDurationOverviewComponent', () => {
  let component: MDSprintDurationOverviewComponent;
  let fixture: ComponentFixture<MDSprintDurationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDSprintDurationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDSprintDurationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
