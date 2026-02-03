import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSolutionsComponent } from './bulk-solutions.component';

describe('BulkSolutionsComponent', () => {
  let component: BulkSolutionsComponent;
  let fixture: ComponentFixture<BulkSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkSolutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
