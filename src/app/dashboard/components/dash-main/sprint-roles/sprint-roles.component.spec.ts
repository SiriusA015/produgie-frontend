import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintRolesComponent } from './sprint-roles.component';

describe('SprintRolesComponent', () => {
  let component: SprintRolesComponent;
  let fixture: ComponentFixture<SprintRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
