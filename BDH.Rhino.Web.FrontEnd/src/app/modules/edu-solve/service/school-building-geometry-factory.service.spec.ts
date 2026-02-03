import { TestBed } from '@angular/core/testing';

import { SchoolBuildingGeometryFactoryService } from './school-building-geometry-factory.service';

describe('SchoolBuildingGeometryFactoryService', () => {
  let service: SchoolBuildingGeometryFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolBuildingGeometryFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
