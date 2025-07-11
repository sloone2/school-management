import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseGridRoutingModule } from './course-grid-routing.module';
import { CourseGridComponent } from './course-grid.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [
    CourseGridComponent
  ],
  imports: [
    CommonModule,
    CourseGridRoutingModule,
    SharedModule,
    MatSliderModule
  ]
})
export class CourseGridModule { }
