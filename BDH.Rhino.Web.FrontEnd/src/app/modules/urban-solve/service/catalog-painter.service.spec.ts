import { TestBed } from '@angular/core/testing';

import { CatalogPainterService } from './catalog-painter.service';

describe('CatalogPainterService', () => {
  let service: CatalogPainterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogPainterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
