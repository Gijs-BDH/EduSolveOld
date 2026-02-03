import { TestBed } from '@angular/core/testing';

import { BagViewerService } from './bag-viewer.service';

describe('BagViewerService', () => {
  let service: BagViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BagViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
