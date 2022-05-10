import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFeebackComponent } from './team-feeback.component';

describe('TeamFeebackComponent', () => {
  let component: TeamFeebackComponent;
  let fixture: ComponentFixture<TeamFeebackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamFeebackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFeebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
