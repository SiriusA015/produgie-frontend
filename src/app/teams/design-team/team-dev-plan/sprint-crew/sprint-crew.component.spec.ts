import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCrewComponent } from './sprint-crew.component';

describe('SprintCrewComponent', () => {
  let component: SprintCrewComponent;
  let fixture: ComponentFixture<SprintCrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintCrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
