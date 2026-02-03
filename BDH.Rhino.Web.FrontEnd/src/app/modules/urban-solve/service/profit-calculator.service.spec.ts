import { TestBed } from '@angular/core/testing';

import { ProfitCalculatorService } from './profit-calculator.service';

describe('ProfitCalculatorService', () => {
  let service: ProfitCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfitCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
