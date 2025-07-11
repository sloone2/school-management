import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPlansComponent } from './instructor-plans.component';

describe('InstructorPlansComponent', () => {
  let component: InstructorPlansComponent;
  let fixture: ComponentFixture<InstructorPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorPlansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
