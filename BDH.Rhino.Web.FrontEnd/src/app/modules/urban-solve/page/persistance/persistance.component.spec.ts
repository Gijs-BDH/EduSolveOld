import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersistanceComponent } from './persistance.component';

describe('PersistanceComponent', () => {
  let component: PersistanceComponent;
  let fixture: ComponentFixture<PersistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersistanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
