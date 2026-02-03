import { TestBed } from '@angular/core/testing';

import { KeyboardEventDispatcherService } from './keyboard-event-dispatcher.service';

describe('KeyboardEventDispatcherService', () => {
  let service: KeyboardEventDispatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardEventDispatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
