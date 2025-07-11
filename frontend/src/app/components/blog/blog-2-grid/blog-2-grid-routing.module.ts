import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Blog2GridComponent } from './blog-2-grid.component';

const routes: Routes = [{ path: '', component: Blog2GridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Blog2GridRoutingModule { }
