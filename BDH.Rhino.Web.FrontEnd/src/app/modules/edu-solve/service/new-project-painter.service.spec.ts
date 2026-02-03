import { TestBed } from '@angular/core/testing';

import { NewProjectPainterService } from './new-project-painter.service';

describe('NewProjectPainterService', () => {
  let service: NewProjectPainterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewProjectPainterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
