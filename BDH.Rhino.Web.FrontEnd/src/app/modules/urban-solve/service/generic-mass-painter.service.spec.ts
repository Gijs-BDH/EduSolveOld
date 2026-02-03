import { TestBed } from '@angular/core/testing';

import { GenericMassPainterService } from './generic-mass-painter.service';

describe('GenericMassPainterService', () => {
  let service: GenericMassPainterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericMassPainterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
