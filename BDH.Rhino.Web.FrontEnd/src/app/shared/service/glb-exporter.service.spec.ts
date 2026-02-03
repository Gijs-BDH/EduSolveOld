import { TestBed } from '@angular/core/testing';

import { GlbExporterService } from './glb-exporter.service';

describe('GlbExporterService', () => {
  let service: GlbExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlbExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
