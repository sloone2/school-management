import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseWatchComponent } from './course-watch.component';

const routes: Routes = [{ path: '', component: CourseWatchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseWatchRoutingModule { }
