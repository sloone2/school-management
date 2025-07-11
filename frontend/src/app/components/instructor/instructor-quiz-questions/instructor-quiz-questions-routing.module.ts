import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorQuizQuestionsComponent } from './instructor-quiz-questions.component';

const routes: Routes = [{ path: '', component: InstructorQuizQuestionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorQuizQuestionsRoutingModule { }
