import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAdviceComponent } from './team-advice.component';

describe('TeamAdviceComponent', () => {
  let component: TeamAdviceComponent;
  let fixture: ComponentFixture<TeamAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
