import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcUnrealComponent } from './pmc-unreal.component';

describe('PmcUnrealComponent', () => {
  let component: PmcUnrealComponent;
  let fixture: ComponentFixture<PmcUnrealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmcUnrealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmcUnrealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
