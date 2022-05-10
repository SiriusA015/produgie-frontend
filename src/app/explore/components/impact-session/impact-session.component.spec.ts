import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactSessionComponent } from './impact-session.component';

describe('ImpactSessionComponent', () => {
  let component: ImpactSessionComponent;
  let fixture: ComponentFixture<ImpactSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpactSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
