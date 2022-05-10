import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTeamComponent } from './join-team.component';

describe('JoinTeamComponent', () => {
  let component: JoinTeamComponent;
  let fixture: ComponentFixture<JoinTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
