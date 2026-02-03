import { TestBed } from '@angular/core/testing';

import { ConceptConfigurationSolutionGeometryFactoryService } from './concept-configuration-solution-geometry-factory.service';

describe('ConceptConfigurationSolutionGeometryFactoryService', () => {
  let service: ConceptConfigurationSolutionGeometryFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConceptConfigurationSolutionGeometryFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
