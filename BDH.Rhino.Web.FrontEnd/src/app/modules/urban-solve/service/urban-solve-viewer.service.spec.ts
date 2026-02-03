import { TestBed } from '@angular/core/testing';

import { UrbanSolveViewerService } from './urban-solve-viewer.service';

describe('ProjectEditorViewerService', () => {
  let service: UrbanSolveViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrbanSolveViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
