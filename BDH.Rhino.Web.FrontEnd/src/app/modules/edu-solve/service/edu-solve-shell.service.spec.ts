import { TestBed } from '@angular/core/testing';

import { EduSolveShellService } from './edu-solve-shell.service';

describe('ViewerService', () => {
  let service: EduSolveShellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EduSolveShellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
