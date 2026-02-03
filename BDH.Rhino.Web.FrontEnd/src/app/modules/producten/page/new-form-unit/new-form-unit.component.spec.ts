import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormUnitComponent } from './new-form-unit.component';

describe('NewFormUnitComponent', () => {
  let component: NewFormUnitComponent;
  let fixture: ComponentFixture<NewFormUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFormUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFormUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
