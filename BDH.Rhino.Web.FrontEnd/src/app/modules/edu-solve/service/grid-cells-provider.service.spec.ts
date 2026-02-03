import { TestBed } from '@angular/core/testing';

import { GridCellsProviderService } from './grid-cells-provider.service';

describe('GridCellsProviderService', () => {
  let service: GridCellsProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridCellsProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
