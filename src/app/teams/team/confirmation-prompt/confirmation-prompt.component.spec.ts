import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPromptComponent } from './confirmation-prompt.component';

describe('ConfirmationPromptComponent', () => {
  let component: ConfirmationPromptComponent;
  let fixture: ComponentFixture<ConfirmationPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
