import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefbuilderComponent } from './briefbuilder.component';

describe('BriefbuilderComponent', () => {
  let component: BriefbuilderComponent;
  let fixture: ComponentFixture<BriefbuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BriefbuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriefbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
