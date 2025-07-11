import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseResumeRoutingModule } from './course-resume-routing.module';
import { CourseResumeComponent } from './course-resume.component';


@NgModule({
  declarations: [
    CourseResumeComponent
  ],
  imports: [
    CommonModule,
    CourseResumeRoutingModule
  ]
})
export class CourseResumeModule { }
