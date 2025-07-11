import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategory3Component } from './course-category-3.component';

describe('CourseCategory3Component', () => {
  let component: CourseCategory3Component;
  let fixture: ComponentFixture<CourseCategory3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCategory3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCategory3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
