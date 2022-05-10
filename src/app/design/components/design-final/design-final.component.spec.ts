import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignFinalComponent } from './design-final.component';

describe('DesignFinalComponent', () => {
  let component: DesignFinalComponent;
  let fixture: ComponentFixture<DesignFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
