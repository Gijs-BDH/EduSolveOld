import { TestBed } from '@angular/core/testing';

import { BaseLineFactoryService } from './base-line-factory.service';

describe('BaseLineFactoryService', () => {
  let service: BaseLineFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseLineFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
