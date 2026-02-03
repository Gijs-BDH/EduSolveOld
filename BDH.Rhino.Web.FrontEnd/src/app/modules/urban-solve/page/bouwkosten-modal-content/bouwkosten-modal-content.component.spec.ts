import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouwkostenModalContentComponent } from './bouwkosten-modal-content.component';

describe('BouwkostenModalContentComponent', () => {
  let component: BouwkostenModalContentComponent;
  let fixture: ComponentFixture<BouwkostenModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BouwkostenModalContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BouwkostenModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
