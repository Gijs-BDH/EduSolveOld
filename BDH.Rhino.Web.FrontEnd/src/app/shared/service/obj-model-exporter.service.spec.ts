import { TestBed } from '@angular/core/testing';

import { ObjModelExporterService } from './obj-model-exporter.service';

describe('ObjModelExporterService', () => {
  let service: ObjModelExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjModelExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
