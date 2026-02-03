import { TestBed } from '@angular/core/testing';

import { BoxHelperService } from './box-helper.service';

describe('BoxHelperService', () => {
  let service: BoxHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
