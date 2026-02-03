import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionConceptsComponent } from './construction-concepts.component';

describe('ConstructionConceptsComponent', () => {
  let component: ConstructionConceptsComponent;
  let fixture: ComponentFixture<ConstructionConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionConceptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
