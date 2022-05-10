import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdMyadviceComponent } from './sd-myadvice.component';

describe('SdMyadviceComponent', () => {
  let component: SdMyadviceComponent;
  let fixture: ComponentFixture<SdMyadviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdMyadviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdMyadviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
