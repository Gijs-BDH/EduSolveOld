import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptenComponent } from './concepten.component';

describe('ConceptenComponent', () => {
  let component: ConceptenComponent;
  let fixture: ComponentFixture<ConceptenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
