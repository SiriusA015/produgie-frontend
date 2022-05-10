import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsLeftNavComponent } from './teams-left-nav.component';

describe('TeamsLeftNavComponent', () => {
  let component: TeamsLeftNavComponent;
  let fixture: ComponentFixture<TeamsLeftNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsLeftNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
