import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorPlansComponent } from './instructor-plans.component';

const routes: Routes = [{ path: '', component: InstructorPlansComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorPlansRoutingModule { }
