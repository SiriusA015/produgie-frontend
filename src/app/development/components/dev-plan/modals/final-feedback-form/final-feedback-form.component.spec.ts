import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalFeedbackFormComponent } from './final-feedback-form.component';

describe('FinalFeedbackFormComponent', () => {
  let component: FinalFeedbackFormComponent;
  let fixture: ComponentFixture<FinalFeedbackFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalFeedbackFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalFeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
