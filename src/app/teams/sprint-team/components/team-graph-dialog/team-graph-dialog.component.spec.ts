import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGraphDialogComponent } from './team-graph-dialog.component';

describe('TeamGraphDialogComponent', () => {
  let component: TeamGraphDialogComponent;
  let fixture: ComponentFixture<TeamGraphDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGraphDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
