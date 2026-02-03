import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSizeComponent } from './grid-size.component';

describe('GridSizeComponent', () => {
  let component: GridSizeComponent;
  let fixture: ComponentFixture<GridSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
