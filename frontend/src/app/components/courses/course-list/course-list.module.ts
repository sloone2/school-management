import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseListRoutingModule } from './course-list-routing.module';
import { CourseListComponent } from './course-list.component';
import { MatSliderModule } from '@angular/material/slider';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    CourseListComponent
  ],
  imports: [
    CommonModule,
    CourseListRoutingModule,
    SharedModule,
        MatSliderModule
  ]
})
export class CourseListModule { }
