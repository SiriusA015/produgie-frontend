import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCrewOverviewComponent } from './sprint-crew-overview.component';

describe('SprintCrewOverviewComponent', () => {
  let component: SprintCrewOverviewComponent;
  let fixture: ComponentFixture<SprintCrewOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintCrewOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCrewOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
