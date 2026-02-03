import { TestBed } from '@angular/core/testing';
import { TransformControlsService } from './transform-controls.service';


describe('TransformControlsService', () => {
  let service: TransformControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
