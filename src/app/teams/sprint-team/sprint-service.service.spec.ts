import { TestBed } from '@angular/core/testing';

import { SprintServiceService } from './sprint-service.service';

describe('SprintServiceService', () => {
  let service: SprintServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
