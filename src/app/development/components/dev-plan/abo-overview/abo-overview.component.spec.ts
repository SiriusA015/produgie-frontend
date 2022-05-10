import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboOverviewComponent } from './abo-overview.component';

describe('AboOverviewComponent', () => {
  let component: AboOverviewComponent;
  let fixture: ComponentFixture<AboOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
