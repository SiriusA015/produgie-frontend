import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignWelcomeComponent } from './design-welcome.component';

describe('DesignWelcomeComponent', () => {
  let component: DesignWelcomeComponent;
  let fixture: ComponentFixture<DesignWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
