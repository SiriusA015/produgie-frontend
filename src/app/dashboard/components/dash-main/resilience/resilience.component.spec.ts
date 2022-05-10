import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResilienceComponent } from './resilience.component';

describe('ResilienceComponent', () => {
  let component: ResilienceComponent;
  let fixture: ComponentFixture<ResilienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResilienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResilienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
