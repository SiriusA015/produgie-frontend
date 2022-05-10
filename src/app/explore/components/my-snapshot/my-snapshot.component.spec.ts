import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySnapshotComponent } from './my-snapshot.component';

describe('MySnapshotComponent', () => {
  let component: MySnapshotComponent;
  let fixture: ComponentFixture<MySnapshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySnapshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
