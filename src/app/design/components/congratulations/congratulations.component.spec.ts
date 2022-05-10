import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratulationsComponent } from './congratulations.component';

describe('CongratulationsComponent', () => {
  let component: CongratulationsComponent;
  let fixture: ComponentFixture<CongratulationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongratulationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
