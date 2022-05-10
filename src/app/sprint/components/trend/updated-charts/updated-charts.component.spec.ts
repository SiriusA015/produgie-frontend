import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedChartsComponent } from './updated-charts.component';

describe('UpdatedChartsComponent', () => {
  let component: UpdatedChartsComponent;
  let fixture: ComponentFixture<UpdatedChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
