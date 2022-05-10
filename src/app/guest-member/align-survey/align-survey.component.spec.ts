import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignSurveyComponent } from './align-survey.component';

describe('AlignSurveyComponent', () => {
  let component: AlignSurveyComponent;
  let fixture: ComponentFixture<AlignSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlignSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
