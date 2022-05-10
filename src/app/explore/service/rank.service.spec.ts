import { TestBed } from '@angular/core/testing';

import { RankService } from './rank.service';

describe('RankService', () => {
  let service: RankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
