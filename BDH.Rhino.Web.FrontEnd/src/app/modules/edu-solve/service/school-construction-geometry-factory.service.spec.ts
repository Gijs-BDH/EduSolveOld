import { TestBed } from '@angular/core/testing';

import { SchoolConstructionGeometryFactoryService } from './school-construction-geometry-factory.service';

describe('SchoolConstructionGeometryFactoryService', () => {
  let service: SchoolConstructionGeometryFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolConstructionGeometryFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
