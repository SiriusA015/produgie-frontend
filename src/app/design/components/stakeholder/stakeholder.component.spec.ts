import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderComponent } from './stakeholder.component';

describe('StakeholderComponent', () => {
  let component: StakeholderComponent;
  let fixture: ComponentFixture<StakeholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StakeholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
