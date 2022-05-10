import { TestBed } from '@angular/core/testing';

import { OverLayService } from './over-lay.service';

describe('OverLayService', () => {
  let service: OverLayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverLayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
