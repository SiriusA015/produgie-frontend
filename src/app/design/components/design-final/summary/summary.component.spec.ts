import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSummaryComponent } from './summary.component';

describe('DesignSummaryComponent', () => {
  let component: DesignSummaryComponent;
  let fixture: ComponentFixture<DesignSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
