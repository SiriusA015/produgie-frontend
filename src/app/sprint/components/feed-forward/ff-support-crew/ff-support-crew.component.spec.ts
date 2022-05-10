import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfSupportCrewComponent } from './ff-support-crew.component';

describe('FfSupportCrewComponent', () => {
  let component: FfSupportCrewComponent;
  let fixture: ComponentFixture<FfSupportCrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfSupportCrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfSupportCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
