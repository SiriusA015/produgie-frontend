import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintOnMobileDialogComponent } from './sprint-on-mobile-dialog.component';

describe('SprintOnMobileDialogComponent', () => {
  let component: SprintOnMobileDialogComponent;
  let fixture: ComponentFixture<SprintOnMobileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintOnMobileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintOnMobileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
