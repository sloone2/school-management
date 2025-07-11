import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorQuizQuestionsRoutingModule } from './instructor-quiz-questions-routing.module';
import { InstructorQuizQuestionsComponent } from './instructor-quiz-questions.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    InstructorQuizQuestionsComponent
  ],
  imports: [
    CommonModule,
    InstructorQuizQuestionsRoutingModule,
    SharedModule
  ]
})
export class InstructorQuizQuestionsModule { }
