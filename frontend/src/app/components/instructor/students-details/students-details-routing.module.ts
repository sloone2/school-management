import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsDetailsComponent } from './students-details.component';

const routes: Routes = [{ path: '', component: StudentsDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsDetailsRoutingModule { }
