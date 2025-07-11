import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Blog3GridComponent } from './blog-3-grid.component';

const routes: Routes = [{ path: '', component: Blog3GridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Blog3GridRoutingModule { }
