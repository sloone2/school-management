import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogRightSidebarComponent } from './blog-right-sidebar.component';

const routes: Routes = [{ path: '', component: BlogRightSidebarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRightSidebarRoutingModule { }
