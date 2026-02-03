import { TestBed } from '@angular/core/testing';

import { GenericMassModelFactoryService } from './generic-mass-model-factory.service';

describe('GenericMassModelFactoryService', () => {
  let service: GenericMassModelFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericMassModelFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
