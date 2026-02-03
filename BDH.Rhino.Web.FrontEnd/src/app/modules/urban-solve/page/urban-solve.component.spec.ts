import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanSolveComponent } from './urban-solve.component';

describe('UrbanSolveComponent', () => {
  let component: UrbanSolveComponent;
  let fixture: ComponentFixture<UrbanSolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrbanSolveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrbanSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
