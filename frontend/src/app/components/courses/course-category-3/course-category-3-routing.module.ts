import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCategory3Component } from './course-category-3.component';

const routes: Routes = [{ path: '', component: CourseCategory3Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCategory3RoutingModule { }
