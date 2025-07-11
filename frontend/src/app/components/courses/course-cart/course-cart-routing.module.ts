import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCartComponent } from './course-cart.component';

const routes: Routes = [{ path: '', component: CourseCartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCartRoutingModule { }
