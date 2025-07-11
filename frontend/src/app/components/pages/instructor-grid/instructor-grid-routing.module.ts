import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorGridComponent } from './instructor-grid.component';

const routes: Routes = [{ path: '', component: InstructorGridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorGridRoutingModule { }
