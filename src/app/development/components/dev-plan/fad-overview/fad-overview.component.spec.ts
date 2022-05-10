import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FadOverviewComponent } from './fad-overview.component';

describe('FadOverviewComponent', () => {
  let component: FadOverviewComponent;
  let fixture: ComponentFixture<FadOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FadOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FadOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
