import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsFadPriorityComponent } from './teams-fad-priority.component';

describe('TeamsFadPriorityComponent', () => {
  let component: TeamsFadPriorityComponent;
  let fixture: ComponentFixture<TeamsFadPriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsFadPriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsFadPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
