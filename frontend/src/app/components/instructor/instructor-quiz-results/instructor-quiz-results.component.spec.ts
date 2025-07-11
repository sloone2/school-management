import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorQuizResultsComponent } from './instructor-quiz-results.component';

describe('InstructorQuizResultsComponent', () => {
  let component: InstructorQuizResultsComponent;
  let fixture: ComponentFixture<InstructorQuizResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorQuizResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorQuizResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
