import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCongratulationsComponent } from './sprint-congratulations.component';

describe('SprintCongratulationsComponent', () => {
  let component: SprintCongratulationsComponent;
  let fixture: ComponentFixture<SprintCongratulationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintCongratulationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCongratulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
