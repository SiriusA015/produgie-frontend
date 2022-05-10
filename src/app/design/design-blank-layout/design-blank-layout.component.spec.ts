import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignBlankLayoutComponent } from './design-blank-layout.component';

describe('DesignBlankLayoutComponent', () => {
  let component: DesignBlankLayoutComponent;
  let fixture: ComponentFixture<DesignBlankLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignBlankLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignBlankLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
