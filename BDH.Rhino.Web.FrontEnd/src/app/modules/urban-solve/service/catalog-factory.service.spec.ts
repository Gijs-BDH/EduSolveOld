import { TestBed } from '@angular/core/testing';

import { CatalogFactoryService } from './catalog-factory.service';

describe('CatalogFactoryService', () => {
  let service: CatalogFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
