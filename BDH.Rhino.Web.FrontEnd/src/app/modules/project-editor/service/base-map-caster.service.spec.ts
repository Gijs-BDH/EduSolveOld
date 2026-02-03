import { TestBed } from '@angular/core/testing';

import { BaseMapCasterService } from './base-map-caster.service';

describe('RayCasterService', () => {
  let service: BaseMapCasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseMapCasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
