import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthAndPrioritiesComponent } from './strength-and-priorities.component';

describe('StrengthAndPrioritiesComponent', () => {
  let component: StrengthAndPrioritiesComponent;
  let fixture: ComponentFixture<StrengthAndPrioritiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrengthAndPrioritiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrengthAndPrioritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
