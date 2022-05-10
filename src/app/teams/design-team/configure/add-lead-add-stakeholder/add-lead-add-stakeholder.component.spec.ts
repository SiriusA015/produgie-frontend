import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeadAddStakeholderComponent } from './add-lead-add-stakeholder.component';

describe('AddLeadAddStakeholderComponent', () => {
  let component: AddLeadAddStakeholderComponent;
  let fixture: ComponentFixture<AddLeadAddStakeholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeadAddStakeholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeadAddStakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
