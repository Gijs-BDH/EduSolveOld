import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSolutionComponent } from './bulk-solution.component';

describe('BulkSolutionComponent', () => {
  let component: BulkSolutionComponent;
  let fixture: ComponentFixture<BulkSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkSolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
