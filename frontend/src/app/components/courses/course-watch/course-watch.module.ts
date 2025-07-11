import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseWatchRoutingModule } from './course-watch-routing.module';
import { CourseWatchComponent } from './course-watch.component';
import { SharedModule } from 'src/app/shared/module/shared.module';


@NgModule({
  declarations: [
    CourseWatchComponent
  ],
  imports: [
    CommonModule,
    CourseWatchRoutingModule,
    SharedModule
  ]
})
export class CourseWatchModule { }
