import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintSelectionDetailsComponent } from './sprint-selection-details.component';

describe('SprintSelectionDetailsComponent', () => {
  let component: SprintSelectionDetailsComponent;
  let fixture: ComponentFixture<SprintSelectionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintSelectionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintSelectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
