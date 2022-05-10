import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommentsComponent } from './my-comments.component';

describe('MyCommentsComponent', () => {
  let component: MyCommentsComponent;
  let fixture: ComponentFixture<MyCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
