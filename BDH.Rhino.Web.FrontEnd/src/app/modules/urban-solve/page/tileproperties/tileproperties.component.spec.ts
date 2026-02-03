import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilepropertiesComponent } from './tileproperties.component';

describe('TilepropertiesComponent', () => {
  let component: TilepropertiesComponent;
  let fixture: ComponentFixture<TilepropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilepropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilepropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
