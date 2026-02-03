import { TestBed } from '@angular/core/testing';

import { BagCasterService } from './bag-caster.service';

describe('BagCasterService', () => {
  let service: BagCasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BagCasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
