import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsNavbarComponent } from './teams-navbar.component';

describe('TeamsNavbarComponent', () => {
  let component: TeamsNavbarComponent;
  let fixture: ComponentFixture<TeamsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
