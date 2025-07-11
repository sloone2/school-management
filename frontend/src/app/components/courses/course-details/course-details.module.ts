import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { CourseDetailsComponent } from './course-details.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    CourseDetailsRoutingModule,
    SharedModule
  ]
})
export class CourseDetailsModule { }
