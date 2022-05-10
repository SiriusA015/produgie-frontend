import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsWeeklyCheckinComponent } from './fs-weekly-checkin.component';

describe('FsWeeklyCheckinComponent', () => {
  let component: FsWeeklyCheckinComponent;
  let fixture: ComponentFixture<FsWeeklyCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsWeeklyCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsWeeklyCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
