import { TestBed } from '@angular/core/testing';

import { BuildingConceptPropertiesDictionaryService } from './building-concept-properties-dictionary.service';

describe('BuildingConceptPropertiesDictionaryService', () => {
  let service: BuildingConceptPropertiesDictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingConceptPropertiesDictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
