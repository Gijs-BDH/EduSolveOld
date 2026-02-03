import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitModalContentComponent } from './profit-modal-content.component';

describe('ProfitModalContentComponent', () => {
  let component: ProfitModalContentComponent;
  let fixture: ComponentFixture<ProfitModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitModalContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
