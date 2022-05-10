import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAddStakeholderComponent } from './team-add-stakeholder.component';

describe('TeamAddStakeholderComponent', () => {
  let component: TeamAddStakeholderComponent;
  let fixture: ComponentFixture<TeamAddStakeholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAddStakeholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAddStakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
