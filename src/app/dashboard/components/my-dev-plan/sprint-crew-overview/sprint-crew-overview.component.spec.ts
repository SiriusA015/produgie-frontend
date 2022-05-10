import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDSprintCrewOverviewComponent } from './sprint-crew-overview.component';

describe('MDSprintCrewOverviewComponent', () => {
  let component: MDSprintCrewOverviewComponent;
  let fixture: ComponentFixture<MDSprintCrewOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDSprintCrewOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDSprintCrewOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
