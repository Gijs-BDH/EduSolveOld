import { TestBed } from '@angular/core/testing';

import { BulldozerService } from './bulldozer.service';

describe('BulldozerService', () => {
  let service: BulldozerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulldozerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
