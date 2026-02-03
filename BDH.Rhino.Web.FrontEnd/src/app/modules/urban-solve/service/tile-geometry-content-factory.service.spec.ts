import { TestBed } from '@angular/core/testing';

import { TileGeometryContentFactoryService } from './tile-geometry-content-factory.service';

describe('TileGeometryContentFactoryService', () => {
  let service: TileGeometryContentFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TileGeometryContentFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
