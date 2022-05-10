import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintDurationOverviewComponent } from './sprint-duration-overview.component';

describe('SprintDurationOverviewComponent', () => {
  let component: SprintDurationOverviewComponent;
  let fixture: ComponentFixture<SprintDurationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintDurationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintDurationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
