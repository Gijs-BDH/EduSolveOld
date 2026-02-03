import { TestBed } from '@angular/core/testing';

import { ConstructionConceptService } from './construction-concept.service';

describe('BouwconceptService', () => {
  let service: ConstructionConceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstructionConceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
