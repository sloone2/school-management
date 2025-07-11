import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorPayoutsComponent } from './instructor-payouts.component';

const routes: Routes = [{ path: '', component: InstructorPayoutsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorPayoutsRoutingModule { }
