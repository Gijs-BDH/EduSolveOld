import { TestBed } from '@angular/core/testing';

import { BouwkostenRapportService } from './bouwkosten-rapport.service';

describe('BouwkostenRapportService', () => {
  let service: BouwkostenRapportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BouwkostenRapportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
