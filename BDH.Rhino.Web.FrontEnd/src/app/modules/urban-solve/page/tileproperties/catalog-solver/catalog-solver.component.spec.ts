import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSolverComponent } from './catalog-solver.component';

describe('CatalogSolverComponent', () => {
  let component: CatalogSolverComponent;
  let fixture: ComponentFixture<CatalogSolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogSolverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
