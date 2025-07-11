import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCheckoutRoutingModule } from './course-checkout-routing.module';
import { CourseCheckoutComponent } from './course-checkout.component';


@NgModule({
  declarations: [
    CourseCheckoutComponent
  ],
  imports: [
    CommonModule,
    CourseCheckoutRoutingModule
  ]
})
export class CourseCheckoutModule { }
