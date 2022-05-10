import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSnapshotComponent } from './snapshot.component';

describe('DesignSnapshotComponent', () => {
  let component: DesignSnapshotComponent;
  let fixture: ComponentFixture<DesignSnapshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignSnapshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
