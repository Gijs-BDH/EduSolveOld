import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSolutionsFilterComponent } from './bulk-solutions-filter.component';

describe('BulkSolutionsFilterComponent', () => {
  let component: BulkSolutionsFilterComponent;
  let fixture: ComponentFixture<BulkSolutionsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkSolutionsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkSolutionsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
