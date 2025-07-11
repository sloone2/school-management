import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogLeftSidebarComponent } from './blog-left-sidebar.component';

const routes: Routes = [{ path: '', component: BlogLeftSidebarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogLeftSidebarRoutingModule { }
