import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCongratulationDialogComponent } from './sprint-congratulation-dialog.component';

describe('SprintCongratulationDialogComponent', () => {
  let component: SprintCongratulationDialogComponent;
  let fixture: ComponentFixture<SprintCongratulationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintCongratulationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCongratulationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
