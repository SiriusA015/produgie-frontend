import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSavedDialogComponent } from './portfolio-saved-dialog.component';

describe('PortfolioSavedDialogComponent', () => {
  let component: PortfolioSavedDialogComponent;
  let fixture: ComponentFixture<PortfolioSavedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioSavedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioSavedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
