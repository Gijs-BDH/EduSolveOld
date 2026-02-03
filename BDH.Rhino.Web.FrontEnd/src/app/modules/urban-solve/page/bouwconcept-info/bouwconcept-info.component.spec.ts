import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouwconceptInfoComponent } from './bouwconcept-info.component';

describe('BouwconceptInfoComponent', () => {
  let component: BouwconceptInfoComponent;
  let fixture: ComponentFixture<BouwconceptInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BouwconceptInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BouwconceptInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
