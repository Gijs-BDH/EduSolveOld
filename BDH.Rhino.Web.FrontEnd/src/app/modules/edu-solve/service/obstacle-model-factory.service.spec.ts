import { TestBed } from '@angular/core/testing';

import { ObstacleModelFactoryService } from './obstacle-model-factory.service';

describe('ObstacleModelFactoryService', () => {
  let service: ObstacleModelFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObstacleModelFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
