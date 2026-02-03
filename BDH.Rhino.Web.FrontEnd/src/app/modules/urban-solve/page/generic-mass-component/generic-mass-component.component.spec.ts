import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMassComponentComponent } from './generic-mass-component.component';

describe('GenericMassComponentComponent', () => {
  let component: GenericMassComponentComponent;
  let fixture: ComponentFixture<GenericMassComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericMassComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericMassComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
