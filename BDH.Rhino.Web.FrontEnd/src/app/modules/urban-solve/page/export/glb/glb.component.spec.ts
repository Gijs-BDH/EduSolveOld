import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlbComponent } from './glb.component';

describe('GlbComponent', () => {
  let component: GlbComponent;
  let fixture: ComponentFixture<GlbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
