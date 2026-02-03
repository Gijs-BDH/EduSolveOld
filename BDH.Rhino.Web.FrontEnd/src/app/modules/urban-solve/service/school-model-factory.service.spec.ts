import { TestBed } from '@angular/core/testing';

import { SchoolModelFactoryService } from './school-model-factory.service';

describe('SchoolModelFactoryService', () => {
  let service: SchoolModelFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolModelFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
