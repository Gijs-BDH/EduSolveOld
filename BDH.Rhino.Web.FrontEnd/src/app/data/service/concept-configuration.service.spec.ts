import { TestBed } from '@angular/core/testing';

import { ConceptConfigurationService } from './concept-configuration.service';

describe('PersistenceService', () => {
  let service: ConceptConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConceptConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
