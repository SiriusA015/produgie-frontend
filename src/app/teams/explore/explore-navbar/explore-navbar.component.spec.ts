import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreNavbarComponent } from './explore-navbar.component';

describe('ExploreNavbarComponent', () => {
  let component: ExploreNavbarComponent;
  let fixture: ComponentFixture<ExploreNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
