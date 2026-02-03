import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColladaComponent } from './collada.component';

describe('ColladaComponent', () => {
  let component: ColladaComponent;
  let fixture: ComponentFixture<ColladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColladaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
