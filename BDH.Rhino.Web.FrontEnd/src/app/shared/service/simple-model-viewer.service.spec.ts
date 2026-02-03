import { TestBed } from '@angular/core/testing';

import { SimpleModelViewerService } from './simple-model-viewer.service';

describe('SimpleModelViewerService', () => {
  let service: SimpleModelViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleModelViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
