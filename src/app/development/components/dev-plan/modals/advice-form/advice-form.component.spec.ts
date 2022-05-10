import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceFormComponent } from './advice-form.component';

describe('AdviceFormComponent', () => {
  let component: AdviceFormComponent;
  let fixture: ComponentFixture<AdviceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
