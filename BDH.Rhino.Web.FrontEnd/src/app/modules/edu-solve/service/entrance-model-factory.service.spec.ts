import { TestBed } from '@angular/core/testing';

import { EntranceModelFactoryService } from './entrance-model-factory.service';

describe('EntranceModelFactoryService', () => {
  let service: EntranceModelFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntranceModelFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
