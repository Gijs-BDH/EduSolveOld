import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeDialogComponent } from './shape-dialog.component';

describe('ShapeDialogComponent', () => {
  let component: ShapeDialogComponent;
  let fixture: ComponentFixture<ShapeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
