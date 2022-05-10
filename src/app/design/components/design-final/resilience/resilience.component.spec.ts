import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignResilienceComponent } from './resilience.component';

describe('DesignResilienceComponent', () => {
  let component: DesignResilienceComponent;
  let fixture: ComponentFixture<DesignResilienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignResilienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignResilienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
