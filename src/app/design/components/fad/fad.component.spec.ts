import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FadComponent } from './fad.component';

describe('FadComponent', () => {
  let component: FadComponent;
  let fixture: ComponentFixture<FadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
