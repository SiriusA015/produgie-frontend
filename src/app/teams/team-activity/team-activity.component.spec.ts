import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamActivityComponent } from './team-activity.component';

describe('TeamActivityComponent', () => {
  let component: TeamActivityComponent;
  let fixture: ComponentFixture<TeamActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
