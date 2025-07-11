import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseResumeComponent } from './course-resume.component';

const routes: Routes = [{ path: '', component: CourseResumeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseResumeRoutingModule { }
