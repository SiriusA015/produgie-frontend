import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamWelcomeDesignComponent } from './team-welcome-design.component';

describe('TeamWelcomeDesignComponent', () => {
  let component: TeamWelcomeDesignComponent;
  let fixture: ComponentFixture<TeamWelcomeDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamWelcomeDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamWelcomeDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
