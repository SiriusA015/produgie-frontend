import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSprintRolesComponent } from './sprint-roles.component';

describe('DesignSprintRolesComponent', () => {
  let component: DesignSprintRolesComponent;
  let fixture: ComponentFixture<DesignSprintRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignSprintRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignSprintRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
