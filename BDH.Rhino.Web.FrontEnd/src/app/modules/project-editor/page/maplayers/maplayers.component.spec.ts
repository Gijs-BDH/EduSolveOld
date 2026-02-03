import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaplayersComponent } from './maplayers.component';

describe('MaplayersComponent', () => {
  let component: MaplayersComponent;
  let fixture: ComponentFixture<MaplayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaplayersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
