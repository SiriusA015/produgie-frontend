import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdBottomDialogComponent } from './sd-bottom-dialog.component';

describe('SdBottomDialogComponent', () => {
  let component: SdBottomDialogComponent;
  let fixture: ComponentFixture<SdBottomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdBottomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdBottomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
