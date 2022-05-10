import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfSearchComponent } from './ff-search.component';

describe('FfSearchComponent', () => {
  let component: FfSearchComponent;
  let fixture: ComponentFixture<FfSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
