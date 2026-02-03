import { TestBed } from '@angular/core/testing';

import { ProjectBoundaryPainterService } from './project-boundary-painter.service';

describe('ProjectBoundaryPainterService', () => {
  let service: ProjectBoundaryPainterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectBoundaryPainterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
