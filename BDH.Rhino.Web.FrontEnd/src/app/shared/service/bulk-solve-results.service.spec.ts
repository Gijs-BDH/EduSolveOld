import { TestBed } from '@angular/core/testing';

import { BulkSolveResultsService } from './bulk-solve-results.service';

describe('BulkSolveResultsService', () => {
  let service: BulkSolveResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkSolveResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
