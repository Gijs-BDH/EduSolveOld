import { TestBed } from '@angular/core/testing';

import { MouseEventDispatcherService } from './mouse-event-dispatcher.service';

describe('MouseEventDispatcherService', () => {
  let service: MouseEventDispatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouseEventDispatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
