import { TestBed } from '@angular/core/testing';

import { ShellSelectorService } from './shell-selector.service';

describe('ShellSelectorService', () => {
  let service: ShellSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShellSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
