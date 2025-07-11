import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCartComponent } from './course-cart.component';

describe('CourseCartComponent', () => {
  let component: CourseCartComponent;
  let fixture: ComponentFixture<CourseCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
