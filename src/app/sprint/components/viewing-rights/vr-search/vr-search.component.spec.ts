import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrSearchComponent } from './vr-search.component';

describe('VrSearchComponent', () => {
  let component: VrSearchComponent;
  let fixture: ComponentFixture<VrSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
