import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendDialogComponent } from './extend-dialog.component';

describe('ExtendDialogComponent', () => {
  let component: ExtendDialogComponent;
  let fixture: ComponentFixture<ExtendDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
