import { TestBed } from '@angular/core/testing';

import { BulkSolutionsFilterService } from './bulk-solutions-filter.service';

describe('BulkSolutionsFilterService', () => {
  let service: BulkSolutionsFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkSolutionsFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
