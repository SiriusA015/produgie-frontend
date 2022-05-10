import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriotityWarningModalComponent } from './priority-warning-modal.component';

describe('WarningModalComponent', () => {
  let component: PriotityWarningModalComponent;
  let fixture: ComponentFixture<PriotityWarningModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriotityWarningModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriotityWarningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
