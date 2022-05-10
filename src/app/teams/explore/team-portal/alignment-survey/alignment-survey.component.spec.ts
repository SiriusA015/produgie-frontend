import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignmentSurveyComponent } from './alignment-survey.component';

describe('AlignmentSurveyComponent', () => {
  let component: AlignmentSurveyComponent;
  let fixture: ComponentFixture<AlignmentSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlignmentSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignmentSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
