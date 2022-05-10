import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsFadComponent } from './teams-fad.component';

describe('TeamsFadComponent', () => {
  let component: TeamsFadComponent;
  let fixture: ComponentFixture<TeamsFadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsFadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsFadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
