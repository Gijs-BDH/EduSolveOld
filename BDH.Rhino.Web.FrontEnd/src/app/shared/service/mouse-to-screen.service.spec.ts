import { TestBed } from '@angular/core/testing';

import { MouseToScreenService } from './mouse-to-screen.service';

describe('MouseToScreenService', () => {
  let service: MouseToScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouseToScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
