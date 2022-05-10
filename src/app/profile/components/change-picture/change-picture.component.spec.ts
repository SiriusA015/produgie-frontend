import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePictureComponent } from './change-picture.component';

describe('ChangePictureComponent', () => {
  let component: ChangePictureComponent;
  let fixture: ComponentFixture<ChangePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
