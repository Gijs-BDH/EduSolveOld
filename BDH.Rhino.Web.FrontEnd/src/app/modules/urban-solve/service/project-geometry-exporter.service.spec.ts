import { TestBed } from '@angular/core/testing';

import { ProjectGeometryExporterService } from './project-geometry-exporter.service';

describe('ProjectGeometryExporterService', () => {
  let service: ProjectGeometryExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectGeometryExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
