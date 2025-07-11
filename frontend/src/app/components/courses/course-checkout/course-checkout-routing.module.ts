import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCheckoutComponent } from './course-checkout.component';

const routes: Routes = [{ path: '', component: CourseCheckoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCheckoutRoutingModule { }
