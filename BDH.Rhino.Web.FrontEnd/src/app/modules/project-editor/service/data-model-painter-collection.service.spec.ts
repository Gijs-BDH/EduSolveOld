import { TestBed } from '@angular/core/testing';

import { DataModelPainterCollectionService } from './data-model-painter-collection.service';

describe('DataModelPainterCollectionService', () => {
  let service: DataModelPainterCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataModelPainterCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
