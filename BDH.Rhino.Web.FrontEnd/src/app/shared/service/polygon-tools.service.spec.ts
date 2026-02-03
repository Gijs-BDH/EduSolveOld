import { TestBed } from '@angular/core/testing';

import { PolygonToolsService } from './polygon-tools.service';

describe('PolygonToolsService', () => {
  let service: PolygonToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolygonToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
