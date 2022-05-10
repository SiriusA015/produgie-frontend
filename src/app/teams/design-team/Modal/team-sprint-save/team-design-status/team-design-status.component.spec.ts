import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDesignStatusComponent } from './team-design-status.component';

describe('TeamDesignStatusComponent', () => {
  let component: TeamDesignStatusComponent;
  let fixture: ComponentFixture<TeamDesignStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDesignStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDesignStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
