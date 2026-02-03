import { TestBed } from '@angular/core/testing';

import { FixedPointPainterService } from './fixed-point-painter.service';

describe('EntrancePainterService', () => {
  let service: FixedPointPainterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedPointPainterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
