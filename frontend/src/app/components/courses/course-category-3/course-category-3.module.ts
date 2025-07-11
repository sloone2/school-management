import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCategory3RoutingModule } from './course-category-3-routing.module';
import { CourseCategory3Component } from './course-category-3.component';


@NgModule({
  declarations: [
    CourseCategory3Component
  ],
  imports: [
    CommonModule,
    CourseCategory3RoutingModule
  ]
})
export class CourseCategory3Module { }
