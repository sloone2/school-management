import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCategoryRoutingModule } from './course-category-routing.module';
import { CourseCategoryComponent } from './course-category.component';


@NgModule({
  declarations: [
    CourseCategoryComponent
  ],
  imports: [
    CommonModule,
    CourseCategoryRoutingModule
  ]
})
export class CourseCategoryModule { }
