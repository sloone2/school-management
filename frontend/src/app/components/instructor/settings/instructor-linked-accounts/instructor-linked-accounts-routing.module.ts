import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorLinkedAccountsComponent } from './instructor-linked-accounts.component';

const routes: Routes = [{ path: '', component: InstructorLinkedAccountsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorLinkedAccountsRoutingModule { }
