import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategory2Component } from './course-category-2.component';

describe('CourseCategory2Component', () => {
  let component: CourseCategory2Component;
  let fixture: ComponentFixture<CourseCategory2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCategory2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCategory2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
