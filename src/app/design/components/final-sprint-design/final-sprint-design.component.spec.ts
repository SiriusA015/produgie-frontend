import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSprintDesignComponent } from './final-sprint-design.component';

describe('FinalSprintDesignComponent', () => {
  let component: FinalSprintDesignComponent;
  let fixture: ComponentFixture<FinalSprintDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalSprintDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalSprintDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
