import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutGrowthLeadersComponent } from './about-growth-leaders.component';

describe('AboutGrowthLeadersComponent', () => {
  let component: AboutGrowthLeadersComponent;
  let fixture: ComponentFixture<AboutGrowthLeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutGrowthLeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutGrowthLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
