import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCategory2RoutingModule } from './course-category-2-routing.module';
import { CourseCategory2Component } from './course-category-2.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    CourseCategory2Component
  ],
  imports: [
    CommonModule,
    CourseCategory2RoutingModule,
    SharedModule
  ]
})
export class CourseCategory2Module { }
