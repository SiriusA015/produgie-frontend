import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignStrengthComponent } from './design-strength.component';

describe('DesignStrengthComponent', () => {
  let component: DesignStrengthComponent;
  let fixture: ComponentFixture<DesignStrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignStrengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
