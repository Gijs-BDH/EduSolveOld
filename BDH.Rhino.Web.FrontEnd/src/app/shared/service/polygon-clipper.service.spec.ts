import { TestBed } from '@angular/core/testing';

import { PolygonClipperService } from './polygon-clipper.service';

describe('PolygonClipperService', () => {
  let service: PolygonClipperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolygonClipperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
