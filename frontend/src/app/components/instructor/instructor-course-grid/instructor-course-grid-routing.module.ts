import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorCourseGridComponent } from './instructor-course-grid.component';

const routes: Routes = [{ path: '', component: InstructorCourseGridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorCourseGridRoutingModule { }
