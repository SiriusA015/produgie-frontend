import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseMenuDialogComponent } from './response-menu-dialog.component';

describe('ResponseMenuDialogComponent', () => {
  let component: ResponseMenuDialogComponent;
  let fixture: ComponentFixture<ResponseMenuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseMenuDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
