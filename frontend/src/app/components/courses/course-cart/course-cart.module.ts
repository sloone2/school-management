import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCartRoutingModule } from './course-cart-routing.module';
import { CourseCartComponent } from './course-cart.component';


@NgModule({
  declarations: [
    CourseCartComponent
  ],
  imports: [
    CommonModule,
    CourseCartRoutingModule
  ]
})
export class CourseCartModule { }
