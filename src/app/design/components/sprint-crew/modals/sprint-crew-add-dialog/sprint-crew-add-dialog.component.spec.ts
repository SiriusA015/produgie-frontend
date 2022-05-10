import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCrewAddDialogComponent } from './sprint-crew-add-dialog.component';

describe('SprintCrewAddDialogComponent', () => {
  let component: SprintCrewAddDialogComponent;
  let fixture: ComponentFixture<SprintCrewAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintCrewAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCrewAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
