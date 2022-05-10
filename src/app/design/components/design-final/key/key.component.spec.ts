import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignKeyComponent } from './key.component';

describe('DesignKeyComponent', () => {
  let component: DesignKeyComponent;
  let fixture: ComponentFixture<DesignKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
