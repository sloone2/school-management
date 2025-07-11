import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCourseRoutingModule } from './add-course-routing.module';
import { AddCourseComponent } from './add-course.component';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  declarations: [
    AddCourseComponent
  ],
  imports: [
    CommonModule,
    AddCourseRoutingModule,
    SharedModule,
    TagInputModule
  ]
})
export class AddCourseModule { }
