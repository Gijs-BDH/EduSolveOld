import { TestBed } from '@angular/core/testing';

import { PmcUnrealService } from './pmc-unreal.service';

describe('PmcUnrealService', () => {
  let service: PmcUnrealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmcUnrealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
