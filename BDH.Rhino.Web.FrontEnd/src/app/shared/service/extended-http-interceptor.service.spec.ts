import { TestBed } from '@angular/core/testing';

import { ExtendedHttpInterceptorService } from './extended-http-interceptor.service';

describe('ExtendedHttpInterceptorService', () => {
  let service: ExtendedHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtendedHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
