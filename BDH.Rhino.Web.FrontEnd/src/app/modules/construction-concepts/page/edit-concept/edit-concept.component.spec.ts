import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConceptComponent } from './edit-concept.component';

describe('EditConceptComponent', () => {
  let component: EditConceptComponent;
  let fixture: ComponentFixture<EditConceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConceptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
