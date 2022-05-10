import { TestBed } from '@angular/core/testing';

import { TeamdevelopmentService } from './teamdevelopment.service';

describe('TeamdevelopmentService', () => {
  let service: TeamdevelopmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamdevelopmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
