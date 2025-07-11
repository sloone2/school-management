import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetails2RoutingModule } from './course-details-2-routing.module';
import { CourseDetails2Component } from './course-details-2.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    CourseDetails2Component
  ],
  imports: [
    CommonModule,
    CourseDetails2RoutingModule,
    SharedModule
  ]
})
export class CourseDetails2Module { }
