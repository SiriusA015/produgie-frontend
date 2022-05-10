import { TestBed } from '@angular/core/testing';

import { LocalModalDataService } from './local-modal-data.service';

describe('LocalModalDataService', () => {
  let service: LocalModalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalModalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
