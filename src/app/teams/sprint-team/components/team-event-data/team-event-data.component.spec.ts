import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEventDataComponent } from './team-event-data.component';

describe('TeamEventDataComponent', () => {
  let component: TeamEventDataComponent;
  let fixture: ComponentFixture<TeamEventDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamEventDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEventDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
