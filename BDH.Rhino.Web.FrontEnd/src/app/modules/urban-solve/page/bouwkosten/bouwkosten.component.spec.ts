import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouwkostenComponent } from './bouwkosten.component';

describe('BouwkostenComponent', () => {
  let component: BouwkostenComponent;
  let fixture: ComponentFixture<BouwkostenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BouwkostenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BouwkostenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
