import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorQuizQuestionsComponent } from './instructor-quiz-questions.component';

describe('InstructorQuizQuestionsComponent', () => {
  let component: InstructorQuizQuestionsComponent;
  let fixture: ComponentFixture<InstructorQuizQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorQuizQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorQuizQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
