import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorDetailsComponent } from './instructor-details.component';

const routes: Routes = [{ path: '', component: InstructorDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorDetailsRoutingModule { }
