import { TestBed } from '@angular/core/testing';

import { PolygonFactory } from './polygon-factory.service';

describe('PolygonFactoryService', () => {
  let service: PolygonFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolygonFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
