import { TestBed } from '@angular/core/testing';

import { BouwconceptConfigurationService } from './bouwconcept-configuration.service';

describe('BouwconceptConfigurationService', () => {
  let service: BouwconceptConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BouwconceptConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
