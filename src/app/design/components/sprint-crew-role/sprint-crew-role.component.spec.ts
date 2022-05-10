import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCrewRoleComponent } from './sprint-crew-role.component';

describe('SprintCrewRoleComponent', () => {
  let component: SprintCrewRoleComponent;
  let fixture: ComponentFixture<SprintCrewRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintCrewRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCrewRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
