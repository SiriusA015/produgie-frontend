import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedDashboardComponent } from './updated-dashboard.component';

describe('UpdatedDashboardComponent', () => {
  let component: UpdatedDashboardComponent;
  let fixture: ComponentFixture<UpdatedDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
