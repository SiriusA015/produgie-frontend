import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSummaryDetailsComponent } from './summary-details.component';

describe('DesignSummaryDetailsComponent', () => {
  let component: DesignSummaryDetailsComponent;
  let fixture: ComponentFixture<DesignSummaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignSummaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignSummaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
