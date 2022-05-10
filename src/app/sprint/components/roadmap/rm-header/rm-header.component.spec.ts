import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmHeaderComponent } from './rm-header.component';

describe('RmHeaderComponent', () => {
  let component: RmHeaderComponent;
  let fixture: ComponentFixture<RmHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
