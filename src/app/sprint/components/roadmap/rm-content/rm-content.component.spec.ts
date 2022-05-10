import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmContentComponent } from './rm-content.component';

describe('RmContentComponent', () => {
  let component: RmContentComponent;
  let fixture: ComponentFixture<RmContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
