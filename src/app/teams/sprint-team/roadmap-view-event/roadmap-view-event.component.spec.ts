import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapViewEventComponent } from './roadmap-view-event.component';

describe('RoadmapViewEventComponent', () => {
  let component: RoadmapViewEventComponent;
  let fixture: ComponentFixture<RoadmapViewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadmapViewEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapViewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
