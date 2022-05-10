import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamViewEventComponent } from './team-view-event.component';

describe('TeamViewEventComponent', () => {
  let component: TeamViewEventComponent;
  let fixture: ComponentFixture<TeamViewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamViewEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamViewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
