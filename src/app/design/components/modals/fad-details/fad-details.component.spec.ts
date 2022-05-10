import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FadDetailsComponent } from './fad-details.component';

describe('FadDetailsComponent', () => {
  let component: FadDetailsComponent;
  let fixture: ComponentFixture<FadDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FadDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
