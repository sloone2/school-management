import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorStatementsComponent } from './instructor-statements.component';

const routes: Routes = [{ path: '', component: InstructorStatementsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorStatementsRoutingModule { }
