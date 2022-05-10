import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDAboOverviewComponent } from './abo-overview.component';

describe('MDAboOverviewComponent', () => {
  let component: MDAboOverviewComponent;
  let fixture: ComponentFixture<MDAboOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDAboOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDAboOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
