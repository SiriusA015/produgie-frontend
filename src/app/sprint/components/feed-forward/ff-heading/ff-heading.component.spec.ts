import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfHeadingComponent } from './ff-heading.component';

describe('FfHeadingComponent', () => {
  let component: FfHeadingComponent;
  let fixture: ComponentFixture<FfHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
