import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileSplitterComponent } from './tile-splitter.component';

describe('TileSplitterComponent', () => {
  let component: TileSplitterComponent;
  let fixture: ComponentFixture<TileSplitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileSplitterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TileSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
