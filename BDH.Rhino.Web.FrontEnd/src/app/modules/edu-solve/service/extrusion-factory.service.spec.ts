import { TestBed } from '@angular/core/testing';

import { ExtrusionFactoryService } from './extrusion-factory.service';

describe('ExtrusionFactoryService', () => {
  let service: ExtrusionFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtrusionFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
