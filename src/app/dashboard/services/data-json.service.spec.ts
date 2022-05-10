import { TestBed } from '@angular/core/testing';

import { DataJSONService } from './data-json.service';

describe('DataJSONService', () => {
  let service: DataJSONService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataJSONService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
