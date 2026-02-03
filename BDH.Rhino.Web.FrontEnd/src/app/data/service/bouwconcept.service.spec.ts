import { TestBed } from '@angular/core/testing';

import { BouwconceptService } from './bouwconcept.service';

describe('BouwconceptService', () => {
  let service: BouwconceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BouwconceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
