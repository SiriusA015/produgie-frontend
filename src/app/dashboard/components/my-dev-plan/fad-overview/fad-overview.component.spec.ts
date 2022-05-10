import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDFadOverviewComponent } from './fad-overview.component';

describe('MDFadOverviewComponent', () => {
  let component: MDFadOverviewComponent;
  let fixture: ComponentFixture<MDFadOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDFadOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDFadOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
