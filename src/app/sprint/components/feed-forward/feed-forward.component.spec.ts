import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedForwardComponent } from './feed-forward.component';

describe('FeedForwardComponent', () => {
  let component: FeedForwardComponent;
  let fixture: ComponentFixture<FeedForwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedForwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
