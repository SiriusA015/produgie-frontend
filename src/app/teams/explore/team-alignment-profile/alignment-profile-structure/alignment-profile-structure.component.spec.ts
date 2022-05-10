import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentProfileStructureComponent } from './alignment-profile-structure.component';

describe('AlignmentProfileStructureComponent', () => {
  let component: AlignmentProfileStructureComponent;
  let fixture: ComponentFixture<AlignmentProfileStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlignmentProfileStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignmentProfileStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
