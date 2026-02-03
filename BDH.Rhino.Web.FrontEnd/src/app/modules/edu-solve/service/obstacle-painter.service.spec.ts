import { TestBed } from '@angular/core/testing';

import { ObstaclePainterService } from './obstacle-painter.service';

describe('ObstaclePainterService', () => {
  let service: ObstaclePainterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObstaclePainterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
