import { TestBed } from '@angular/core/testing';

import { BuildingConceptGeometryLoaderService } from './building-concept-geometry-loader.service';

describe('BuildingConceptGeometryLoaderService', () => {
  let service: BuildingConceptGeometryLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingConceptGeometryLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
