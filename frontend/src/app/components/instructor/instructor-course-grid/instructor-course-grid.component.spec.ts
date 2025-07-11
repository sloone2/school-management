import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseGridComponent } from './instructor-course-grid.component';

describe('InstructorCourseGridComponent', () => {
  let component: InstructorCourseGridComponent;
  let fixture: ComponentFixture<InstructorCourseGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorCourseGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorCourseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
