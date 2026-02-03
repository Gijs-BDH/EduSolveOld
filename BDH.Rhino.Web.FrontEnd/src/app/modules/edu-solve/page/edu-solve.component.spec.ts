import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduSolveComponent } from './edu-solve.component';

describe('EduSolveComponent', () => {
  let component: EduSolveComponent;
  let fixture: ComponentFixture<EduSolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EduSolveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EduSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
