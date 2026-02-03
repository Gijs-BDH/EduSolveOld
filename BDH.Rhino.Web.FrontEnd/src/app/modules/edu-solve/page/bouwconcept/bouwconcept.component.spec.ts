import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouwconceptComponent } from './bouwconcept.component';

describe('BouwconceptComponent', () => {
  let component: BouwconceptComponent;
  let fixture: ComponentFixture<BouwconceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BouwconceptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BouwconceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
