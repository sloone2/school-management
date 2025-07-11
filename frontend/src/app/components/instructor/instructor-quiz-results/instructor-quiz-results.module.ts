import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorQuizResultsRoutingModule } from './instructor-quiz-results-routing.module';
import { InstructorQuizResultsComponent } from './instructor-quiz-results.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { CustomPaginationModule } from 'src/app/shared/service/custom-pagination/custom-pagination.module';


@NgModule({
  declarations: [
    InstructorQuizResultsComponent
  ],
  imports: [
    CommonModule,
    InstructorQuizResultsRoutingModule,
    SharedModule,
    CustomPaginationModule
  ]
})
export class InstructorQuizResultsModule { }
