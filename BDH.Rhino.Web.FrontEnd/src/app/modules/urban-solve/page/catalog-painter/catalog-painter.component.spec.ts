import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPainterComponent } from './catalog-painter.component';

describe('CatalogPainterComponent', () => {
  let component: CatalogPainterComponent;
  let fixture: ComponentFixture<CatalogPainterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogPainterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogPainterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
