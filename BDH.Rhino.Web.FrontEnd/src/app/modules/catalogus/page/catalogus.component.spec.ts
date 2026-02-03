import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogusComponent } from './catalogus.component';

describe('CatalogusComponent', () => {
  let component: CatalogusComponent;
  let fixture: ComponentFixture<CatalogusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
