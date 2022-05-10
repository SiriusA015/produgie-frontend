import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamWarningComponent } from './team-warning.component';

describe('TeamWarningComponent', () => {
  let component: TeamWarningComponent;
  let fixture: ComponentFixture<TeamWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
