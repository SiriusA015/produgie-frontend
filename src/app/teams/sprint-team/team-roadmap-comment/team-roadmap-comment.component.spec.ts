import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRoadmapCommentComponent } from './team-roadmap-comment.component';

describe('TeamRoadmapCommentComponent', () => {
  let component: TeamRoadmapCommentComponent;
  let fixture: ComponentFixture<TeamRoadmapCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamRoadmapCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRoadmapCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
