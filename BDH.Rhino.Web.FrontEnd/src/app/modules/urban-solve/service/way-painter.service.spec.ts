import { TestBed } from '@angular/core/testing';

import { WayPainterService } from './way-painter.service';

describe('WayPainterService', () => {
  let service: WayPainterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WayPainterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
