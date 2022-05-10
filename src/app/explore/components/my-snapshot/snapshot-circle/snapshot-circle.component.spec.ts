import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotCircleComponent } from './snapshot-circle.component';

describe('SnapshotCircleComponent', () => {
  let component: SnapshotCircleComponent;
  let fixture: ComponentFixture<SnapshotCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnapshotCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
