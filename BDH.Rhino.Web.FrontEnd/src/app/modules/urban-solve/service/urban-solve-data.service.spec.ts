import { TestBed } from '@angular/core/testing';

import { UrbanSolveDataService } from './urban-solve-data.service';

describe('UrbanSolveDataService', () => {
  let service: UrbanSolveDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrbanSolveDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
