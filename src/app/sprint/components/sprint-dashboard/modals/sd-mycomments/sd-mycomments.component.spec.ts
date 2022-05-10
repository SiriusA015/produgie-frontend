import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdMycommentsComponent } from './sd-mycomments.component';

describe('SdMycommentsComponent', () => {
  let component: SdMycommentsComponent;
  let fixture: ComponentFixture<SdMycommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdMycommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdMycommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
