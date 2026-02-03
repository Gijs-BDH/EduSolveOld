import { TestBed } from '@angular/core/testing';

import { GlbValidatorService } from './glb-validator.service';

describe('GlbValidatorService', () => {
  let service: GlbValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlbValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
