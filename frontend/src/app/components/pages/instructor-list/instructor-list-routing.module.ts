import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorListComponent } from './instructor-list.component';

const routes: Routes = [{ path: '', component: InstructorListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorListRoutingModule { }
