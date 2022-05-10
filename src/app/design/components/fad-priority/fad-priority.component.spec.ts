import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FadPriorityComponent } from './fad-priority.component';

describe('FadPriorityComponent', () => {
  let component: FadPriorityComponent;
  let fixture: ComponentFixture<FadPriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FadPriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FadPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
