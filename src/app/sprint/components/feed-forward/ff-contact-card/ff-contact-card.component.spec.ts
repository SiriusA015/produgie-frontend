import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfContactCardComponent } from './ff-contact-card.component';

describe('FfContactCardComponent', () => {
  let component: FfContactCardComponent;
  let fixture: ComponentFixture<FfContactCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfContactCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfContactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
