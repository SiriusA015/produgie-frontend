import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAddEventComponent } from './team-add-event.component';

describe('TeamAddEventComponent', () => {
  let component: TeamAddEventComponent;
  let fixture: ComponentFixture<TeamAddEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAddEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
