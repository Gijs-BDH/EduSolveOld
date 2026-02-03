import { TestBed } from '@angular/core/testing';

import { GlbModelDimensionsService } from './glb-model-dimensions.service';

describe('GlbModelDimensionsService', () => {
  let service: GlbModelDimensionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlbModelDimensionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
