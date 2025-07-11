import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCategory2Component } from './course-category-2.component';

const routes: Routes = [{ path: '', component: CourseCategory2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCategory2RoutingModule { }
