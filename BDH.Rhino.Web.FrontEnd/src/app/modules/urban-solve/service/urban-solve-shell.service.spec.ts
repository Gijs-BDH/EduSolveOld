import { TestBed } from '@angular/core/testing';

import { UrbanSolveShellService } from './urban-solve-shell.service';

describe('ShellService', () => {
  let service: UrbanSolveShellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrbanSolveShellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
