import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDevPlanComponent } from './my-dev-plan.component';

describe('MyDevPlanComponent', () => {
  let component: MyDevPlanComponent;
  let fixture: ComponentFixture<MyDevPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDevPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDevPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
