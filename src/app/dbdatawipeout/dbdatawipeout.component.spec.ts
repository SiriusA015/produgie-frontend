import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbdatawipeoutComponent } from './dbdatawipeout.component';

describe('DbdatawipeoutComponent', () => {
  let component: DbdatawipeoutComponent;
  let fixture: ComponentFixture<DbdatawipeoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbdatawipeoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbdatawipeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
