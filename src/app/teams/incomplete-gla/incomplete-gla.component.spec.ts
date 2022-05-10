import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteGlaComponent } from './incomplete-gla.component';

describe('IncompleteGlaComponent', () => {
  let component: IncompleteGlaComponent;
  let fixture: ComponentFixture<IncompleteGlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncompleteGlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompleteGlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
