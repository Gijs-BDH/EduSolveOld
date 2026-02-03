import { TestBed } from '@angular/core/testing';

import { ColladaModelExporterService } from './collada-model-exporter.service';

describe('ColladaModelExporterService', () => {
  let service: ColladaModelExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColladaModelExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
