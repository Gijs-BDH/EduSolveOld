import { TestBed } from '@angular/core/testing';

import { EduSolveDataService } from './edu-solve-data.service';

describe('EduSolveDataService', () => {
  let service: EduSolveDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EduSolveDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
