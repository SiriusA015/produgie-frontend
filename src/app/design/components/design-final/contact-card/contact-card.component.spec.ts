import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignContactCardComponent } from './contact-card.component';

describe('DesignContactCardComponent', () => {
  let component: DesignContactCardComponent;
  let fixture: ComponentFixture<DesignContactCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignContactCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignContactCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
