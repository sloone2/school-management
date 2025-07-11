import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsGridComponent } from './students-grid.component';

const routes: Routes = [{ path: '', component: StudentsGridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsGridRoutingModule { }
