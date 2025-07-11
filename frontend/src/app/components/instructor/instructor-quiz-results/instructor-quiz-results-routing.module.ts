import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorQuizResultsComponent } from './instructor-quiz-results.component';

const routes: Routes = [{ path: '', component: InstructorQuizResultsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorQuizResultsRoutingModule { }
