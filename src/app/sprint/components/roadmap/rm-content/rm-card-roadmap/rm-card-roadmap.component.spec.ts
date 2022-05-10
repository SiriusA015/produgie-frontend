import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmCardRoadmapComponent } from './rm-card-roadmap.component';

describe('RmCardRoadmapComponent', () => {
  let component: RmCardRoadmapComponent;
  let fixture: ComponentFixture<RmCardRoadmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmCardRoadmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmCardRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
