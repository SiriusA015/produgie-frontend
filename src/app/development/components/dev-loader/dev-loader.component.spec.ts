import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevLoaderComponent } from './dev-loader.component';

describe('DevLoaderComponent', () => {
  let component: DevLoaderComponent;
  let fixture: ComponentFixture<DevLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
