import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfContactCardGroupComponent } from './ff-contact-card-group.component';

describe('FfContactCardGroupComponent', () => {
  let component: FfContactCardGroupComponent;
  let fixture: ComponentFixture<FfContactCardGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfContactCardGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfContactCardGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
