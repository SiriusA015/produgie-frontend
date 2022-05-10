import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthLeaderCircleComponent } from './growth-leader-circle.component';

describe('GrowthLeaderCircleComponent', () => {
  let component: GrowthLeaderCircleComponent;
  let fixture: ComponentFixture<GrowthLeaderCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthLeaderCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthLeaderCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
