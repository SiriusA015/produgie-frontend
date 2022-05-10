import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapViewComponent } from './roadmap-view.component';

describe('RoadmapViewComponent', () => {
  let component: RoadmapViewComponent;
  let fixture: ComponentFixture<RoadmapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadmapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
