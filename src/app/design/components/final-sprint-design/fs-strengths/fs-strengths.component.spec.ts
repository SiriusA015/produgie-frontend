import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsStrengthsComponent } from './fs-strengths.component';

describe('FsStrengthsComponent', () => {
  let component: FsStrengthsComponent;
  let fixture: ComponentFixture<FsStrengthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsStrengthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsStrengthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
