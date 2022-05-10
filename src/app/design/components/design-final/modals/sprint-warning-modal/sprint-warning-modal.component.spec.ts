import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintWarningModalComponent } from './sprint-warning-modal.component';

describe('WarningModalComponent', () => {
  let component: SprintWarningModalComponent;
  let fixture: ComponentFixture<SprintWarningModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintWarningModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintWarningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
