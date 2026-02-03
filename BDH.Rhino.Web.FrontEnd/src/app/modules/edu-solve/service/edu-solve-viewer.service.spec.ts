import { TestBed } from '@angular/core/testing';

import { EduSolveViewerService } from './edu-solve-viewer.service';

describe('EduSolveViewerService', () => {
  let service: EduSolveViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EduSolveViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
