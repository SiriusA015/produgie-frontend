import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsSetupComponent } from './teams-setup.component';

describe('TeamsSetupComponent', () => {
  let component: TeamsSetupComponent;
  let fixture: ComponentFixture<TeamsSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
