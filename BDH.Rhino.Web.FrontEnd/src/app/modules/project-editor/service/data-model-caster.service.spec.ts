import { TestBed } from '@angular/core/testing';

import { DataModelCasterService } from './data-model-caster.service';

describe('TransformableModelCasterService', () => {
  let service: DataModelCasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataModelCasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
