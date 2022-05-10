import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmCardSnapshotComponent } from './rm-card-snapshot.component';

describe('RmCardSnapshotComponent', () => {
  let component: RmCardSnapshotComponent;
  let fixture: ComponentFixture<RmCardSnapshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmCardSnapshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmCardSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
