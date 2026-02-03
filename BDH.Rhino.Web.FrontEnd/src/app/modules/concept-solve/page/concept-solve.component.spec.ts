import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptSolveComponent } from './concept-solve.component';

describe('ConceptSolveComponent', () => {
  let component: ConceptSolveComponent;
  let fixture: ComponentFixture<ConceptSolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptSolveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
