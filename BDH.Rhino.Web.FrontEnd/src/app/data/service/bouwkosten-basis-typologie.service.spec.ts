import { TestBed } from '@angular/core/testing';

import { BouwkostenBasisTypologieService } from './bouwkosten-basis-typologie.service';

describe('BouwkostenBasisTypologieService', () => {
  let service: BouwkostenBasisTypologieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BouwkostenBasisTypologieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
