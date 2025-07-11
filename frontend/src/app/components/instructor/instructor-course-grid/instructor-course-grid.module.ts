import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorCourseGridRoutingModule } from './instructor-course-grid-routing.module';
import { InstructorCourseGridComponent } from './instructor-course-grid.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    InstructorCourseGridComponent
  ],
  imports: [
    CommonModule,
    InstructorCourseGridRoutingModule,
    SharedModule
  ]
})
export class InstructorCourseGridModule { }
