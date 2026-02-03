import { TestBed } from '@angular/core/testing';

import { PolylineFactoryService } from './polyline-factory.service';

describe('PolylineFactoryService', () => {
  let service: PolylineFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolylineFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
