import { TestBed } from '@angular/core/testing';

import { NewLineService } from './new-line.service';

describe('NewLineService', () => {
  let service: NewLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
