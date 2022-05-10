import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotBoxComponent } from './snapshot-box.component';

describe('SnapshotBoxComponent', () => {
  let component: SnapshotBoxComponent;
  let fixture: ComponentFixture<SnapshotBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnapshotBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
