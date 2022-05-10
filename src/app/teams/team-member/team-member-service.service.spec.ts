import { TestBed } from '@angular/core/testing';

import { TeamMemberServiceService } from './team-member-service.service';

describe('TeamMemberServiceService', () => {
  let service: TeamMemberServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMemberServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
